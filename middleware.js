import { NextResponse } from "next/server";

// Protects /admin/* (except /admin/login).
// Only checks that the cookie EXISTS here — full JWT verification
// happens inside each API route and the panel layout.
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
