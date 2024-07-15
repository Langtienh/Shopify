import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

const key = process.env.NO_SECRET!;

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // event.waitUntil(
  //   fetch("http://localhost:3000/api/restricted", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       key,
  //     }),
  //   })
  // );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/smember/:path*", "/cart", "/invoice", "/login", "/register"],
};
