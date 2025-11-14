export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export interface IUserToken {
  email: string;
  role: Role;
}

export type NavItem = {
  title: string;
  href: string;
  iconName?: string;
};
