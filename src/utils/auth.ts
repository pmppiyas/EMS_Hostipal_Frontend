"use server";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export type IRole = "ADMIN" | "PATIENT" | "DOCTOR";

const authRoutes = ["/login", "/signup", "/forget_password", "/reset_password"];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/my_profile", "/sitting"],
  patterns: [],
};

const doctorProtectedRoutes: RouteConfig = {
  patterns: [/^\/doctor/],
  exact: [],
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const isAuthRoutes = (pathname: string) => {
  return authRoutes.includes(pathname);
};

const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, doctorProtectedRoutes)) return "DOCTOR";
  if (isRouteMatches(pathname, patientProtectedRoutes)) return "PATIENT";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

export const getDefaultDashboardRoutes = (role: IRole): string => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "DOCTOR":
      return "/doctor/dashboard";
    case "PATIENT":
      return "/dashboard";
    default:
      return "/";
  }
};
