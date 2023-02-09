import initServer from "./server.ts";

const app = initServer();
const PORT = Number(Deno.env.get("PORT")) || 4444;
console.log("Server started", {
  port: PORT,
  DENO_REGION: Deno.env.get("DENO_REGION"),
});
await app.listen({ port: PORT });
