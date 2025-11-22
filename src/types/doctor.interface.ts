import { ISpecilities } from "@/types/specialities";
import { IGender } from "@/types/user.interfaces";

export interface IDoctor {
  id?: string;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  address?: string;
  registrationNumber: string;
  experience?: number;
  gender: "MALE" | "FEMALE";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  profilePhoto?: string;
  isDeleted?: boolean;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
  doctorSpecialties?: ISpecilities[];
}
