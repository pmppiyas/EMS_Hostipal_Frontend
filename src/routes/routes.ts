import { NavItem } from "@/types/types";

export const adminRoutes: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", iconName: "IconBook" },

  {
    title: "Appointments",
    href: "/admin/dashboard/appointment_management",
    iconName: "IconClipboardDataFilled",
  },
  {
    title: "Sehedules",
    href: "/admin/dashboard/schedule_management",
    iconName: "IconClock2",
  },
  {
    title: "Specialities",
    href: "/admin/dashboard/specialities_management",
    iconName: "IconSchool",
  },
  {
    title: "Doctors",
    href: "/admin/dashboard/doctor_management",
    iconName: "IconStethoscope",
  },
  {
    title: "Patients",
    href: "/admin/dashboard/pateint_management",
    iconName: "IconUser",
  },
  {
    title: "Admins",
    href: "/admin/dashboard/admin_management",
    iconName: "IconHeartCheck",
  },
];

export const doctorRoutes: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", iconName: "dashboard" },
  { title: "Patients", href: "/dashboard/patients", iconName: "user" },
  { title: "Schedule", href: "/dashboard/schedule", iconName: "calendar" },
];

export const patientRoutes: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", iconName: "IconDashboard" },
  {
    title: "Appointments",
    href: "/dashboard/my_appointments",
    iconName: "IconVocabulary",
  },
  {
    title: "Prescriptions",
    href: "/dashboard/my_prescriptions",
    iconName: "IconBook",
  },
  {
    title: "Medical Records",
    href: "/dashboard/my_medical_records",
    iconName: "IconBook2",
  },
];

export const commonRoutes: NavItem[] = [
  { title: "Setting", href: "/setting", iconName: "IconSettings2" },
  {
    title: "Helpline",
    href: "/dashboard/appointments",
    iconName: "IconPhoneCall",
  },
  {
    title: "Medical Records",
    href: "/dashboard/records",
    iconName: "IconDualScreenFilled",
  },
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
