import { Context, secureCompare } from "./deps.ts";

/**
 * Inspired by: https://deno.land/x/basic_auth@v1.1.1
 */
function basicAuth(
  ctx: Context,
  userPasswordTable: Record<string, string>,
): boolean {
  const authorization = ctx.request.headers.get("authorization");
  if (authorization) {
    const match = authorization.match(/^Basic\s+(.*)$/);
    if (match) {
      const [user, pw] = atob(match[1]).split(":");
      if (Object.prototype.hasOwnProperty.call(userPasswordTable, user)) {
        const expectedPw = userPasswordTable[user];
        if (secureCompare(pw, expectedPw)) {
          return true;
        }
      }
    }
  }

  return false;
}

export default basicAuth;
