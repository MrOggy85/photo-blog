import { Context, CSS, Router, RouterContext } from "./deps.ts";

const BASE_URL = "https://photo-file-server.deno.dev";

const CSS_PLACEHOLDER = "/* %CSS% */";
const BODY_PLACEHOLDER = "%body%";

async function getHtml(body: string) {
  const path = `./index.html`;
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(path);
  const html = decoder.decode(data);

  return html
    .replace(CSS_PLACEHOLDER, CSS)
    .replace(BODY_PLACEHOLDER, body);
}

function getTitleHtml() {
  return `
<h1 style="font-size:4em;"><a href="">Oskar Okuno's Photo Blog</a></h1>
`;
}

async function home(ctx: Context) {
  const response = await fetch(`${BASE_URL}/list`);
  const json = await response.json() as string[];

  const body = `${getTitleHtml()}` +
    json.map((x) =>
      `<h2><a href="${x.replaceAll("/", "")}">${x.replaceAll("/", "")}</a></h2>`
    )
      .join("");

  const html = await getHtml(body);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

type GetByIdContext = RouterContext<"/:album", { album: string }>;
async function album(ctx: GetByIdContext) {
  const album = ctx.params.album;
  const response = await fetch(`${BASE_URL}/album/${album}`);
  const json = await response.json() as { url: string; alt: string }[];

  const body = '<h1><a href="./">Oskar Okuno\'s Photo Blog</a></h1>' +
    `<h2 style="font-size: 3em;">${album}</h2>` +
    json.map((x) => `<img src="${x.url}" alt="${x.alt}" />`).join("");

  const html = await getHtml(body);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

function init(router: Router) {
  router
    .get("/", home)
    .get("/:album", album);
}

export default init;
