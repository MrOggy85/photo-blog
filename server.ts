import basicAuth from "./basicAuth.ts";
import { Application, Context, Router } from "./deps.ts";
import initPostsRoutes from "./route.ts";

const BASE_URL = Deno.env.get("BASE_URL") || "/";
const REALM = Deno.env.get("REALM") || "";
const USER = Deno.env.get("USER") || "";
const PASSWORD = Deno.env.get("PASSWORD") || "";

if (!REALM) {
  console.log("Please set REALM env");
  Deno.exit(1);
}
if (!USER) {
  console.log("Please set USER env");
  Deno.exit(1);
}
if (!PASSWORD) {
  console.log("Please set USER env");
  Deno.exit(1);
}

function logger(ctx: Context) {
  console.log(
    `[${ctx.request.ip}] ${ctx.request.method} ${ctx.request.url} - ${ctx.response.status}`,
  );
}

function initServer() {
  const app = new Application();

  app.use(async (ctx, next) => {
    const authorized = basicAuth(ctx, {
      [`${USER}`]: PASSWORD,
    });
    if (!authorized) {
      ctx.response.status = 401;
      ctx.response.headers.set("www-authenticate", `Basic realm="${REALM}"`);
      logger(ctx);
      return;
    }
    await next();
  });

  app.use(async (ctx, next) => {
    const root = `${Deno.cwd()}/static`;
    const path = ctx.request.url.pathname.replace(BASE_URL, "");
    try {
      await ctx.send({
        path,
        root,
        index: BASE_URL,
      });
    } catch {
      await next();
    }
  });

  app.addEventListener("error", (evt) => {
    console.error(evt.error);
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      ctx.response.body = "Internal Server Error";
    } finally {
      logger(ctx);
    }
  });

  const router = new Router();
  initPostsRoutes(router);

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

export default initServer;
