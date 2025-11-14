import { NavItem } from "@/types/types";

export const adminRoutes: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", iconName: "dashboard" },
  { title: "Manage Users", href: "/dashboard/users", iconName: "users" },
  { title: "Reports", href: "/dashboard/reports", iconName: "report" },
];

export const doctorRoutes: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", iconName: "dashboard" },
  { title: "Patients", href: "/dashboard/patients", iconName: "user" },
  { title: "Schedule", href: "/dashboard/schedule", iconName: "calendar" },
];

export const patientRoutes: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", iconName: "dashboard" },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    iconName: "pointer",
  },
  { title: "Medical Records", href: "/dashboard/records", iconName: "pointer" },
];

export const commonRoutes: NavItem[] = [
  { title: "Setting", href: "/setting", iconName: "dashboard" },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    iconName: "pointer",
  },
  { title: "Medical Records", href: "/dashboard/records", iconName: "pointer" },
];

export const getRoutesByRole = (role: string): NavItem[] => {
  switch (role) {
    case "ADMIN":
      return adminRoutes;
    case "DOCTOR":
      return doctorRoutes;
    case "PATIENT":
      return patientRoutes;
    default:
      return [];
  }
};
