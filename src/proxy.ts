import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/profile", "/setting"];

  const authRoutes = ["/login", "/signup", "/forget_password"];

  const isProtectedPath = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  const isAuthRoutes = authRoutes.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoutes && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login", "/signup", "/forget_password"],
};
