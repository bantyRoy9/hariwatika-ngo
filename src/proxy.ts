import { NextRequest, NextResponse } from "next/server";

// UX-only gate: redirect unauthenticated admin visits to login.
// Real auth check is requireAdmin()/assertAdmin() server-side (defense in depth).
// We only check cookie *presence* here — the proxy runs on the edge and can't
// access the SESSION_SECRET-based verification cleanly. Signature is verified server-side.
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // if (process.env.NODE_ENV !== "development") {
      const hasCookie = req.cookies.has("hw_admin");
      if (!hasCookie) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
    // }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
