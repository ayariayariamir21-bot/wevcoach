import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_token";

function getTokenFromRequest(request) {
  // 1. httpOnly cookie first (browser / dashboard UI)
  const fromCookie = request.cookies.get(COOKIE_NAME)?.value;
  if (fromCookie) return fromCookie;

  // 2. Authorization: Bearer header (Postman / scripts)
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7);

  return null;
}

// Returns the decoded admin payload ({ email }) or null.
export function verifyAuth(request) {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  const token = getTokenFromRequest(request);
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
