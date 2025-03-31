import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  console.log("access_token", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
