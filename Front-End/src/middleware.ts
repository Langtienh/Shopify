import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const url = request.url;
  let isLogin = request.cookies.has("next-auth.session-token");
  if ((isLogin && url.includes("login")) || url.includes("register"))
    return NextResponse.redirect(new URL("/", url));
  else if (!isLogin && !url.includes("login") && !url.includes("register"))
    return NextResponse.redirect(new URL("/login", url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/smember/:path*", "/cart", "/invoice", "/login", "/register"],
};
