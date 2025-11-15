import { ENV } from "@/config/env";
import {
  getDefaultDashboardRoutes,
  getRouteOwner,
  IRole,
  isAuthRoutes,
} from "@/lib/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow static files and public routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value || null;
  const isAuth = isAuthRoutes(pathname);
  const routeOwner = getRouteOwner(pathname);

  // Rule 1: Public routes (no protection)
  if (routeOwner === null || routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule 2: No token → redirect to login
  if (!accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  let userRole: IRole | null = null;

  try {
    const verifiedToken = jwt.verify(accessToken, ENV.JWT_SECRET);

    if (typeof verifiedToken !== "string") {
      userRole = verifiedToken.role;
    } else {
      const cookieStore = cookies();
      (await cookieStore).delete("accessToken");
      (await cookieStore).delete("refreshToken");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("JWT Error:", error);

    const loginUrl = new URL("/login", req.url);

    if (error.name === "TokenExpiredError") {
      loginUrl.searchParams.set("error", "session_expired");
    } else {
      loginUrl.searchParams.set("error", "invalid_token");
    }

    const cookieStore = cookies();
    (await cookieStore).delete("accessToken");
    (await cookieStore).delete("refreshToken");

    return NextResponse.redirect(loginUrl);
  }

  // Rule 3: Authenticated user trying to access /login or /signup → redirect to dashboard
  const defaultRoute = getDefaultDashboardRoutes(userRole as IRole);
  if (isAuth && pathname !== defaultRoute) {
    return NextResponse.redirect(new URL(defaultRoute, req.url));
  }

  if (
    (routeOwner === "ADMIN" && userRole !== "ADMIN") ||
    (routeOwner === "DOCTOR" && userRole !== "DOCTOR") ||
    (routeOwner === "PATIENT" && userRole !== "PATIENT")
  ) {
    return NextResponse.redirect(new URL(defaultRoute, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|signup|forget_password|reset_password).*)",
  ],
};
