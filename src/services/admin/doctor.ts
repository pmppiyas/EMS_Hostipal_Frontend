"use server";

import { serverFetch } from "@/lib/server_fetch";
import { IDoctor } from "@/types/doctor.interface";
import { zodValidator } from "@/utils/ZodValidator";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";
// export async function createDoctor(_prevState: any, formData: FormData) {
//   try {
//     console.log("FormData received=>", formData);

//     const raw = formData.get("data") as string;

//     if (!raw) {
//       return { success: false, message: "No form data received" };
//     }

//     const parsed = JSON.parse(raw);

//     console.log("Parsed payload=>", parsed);

//     const payload = {
//       password: parsed.password,
//       ...parsed.doctor,
//     };

//     console.log("Payload after merge=>", payload);

//     // ZOD VALIDATION
//     const result = zodValidator(payload, createDoctorZodSchema);

//     if (!result.success) {
//       return result;
//     }

//     const validatedPayload = result.data;

//     // Upload to backend
//     const newFormData = new FormData();
//     newFormData.append(
//       "data",
//       JSON.stringify({
//         password: validatedPayload?.password,
//         doctor: validatedPayload,
//       })
//     );

//     // If file was included
//     const file = formData.get("file");
//     if (file) {
//       newFormData.append("file", file as Blob);
//     }

//     console.log("Final form data=>", newFormData);

//     const response = await serverFetch.post("user/create_doctor", {
//       body: JSON.stringify(newFormData),
//     });
//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (err: any) {
//     console.error(err);
//     return {
//       success: false,
//       message: err.message,
//     };
//   }
// }

export async function createDoctor(_prevState: any, formData: FormData) {
  try {
    const payload: IDoctor = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
      password: formData.get("password") as string,
    };
    if (zodValidator(payload, createDoctorZodSchema).success === false) {
      return zodValidator(payload, createDoctorZodSchema);
    }

    const validatedPayload = zodValidator(payload, createDoctorZodSchema).data;

    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }

    const newPayload = {
      password: validatedPayload.password,
      doctor: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
        address: validatedPayload.address,
        registrationNumber: validatedPayload.registrationNumber,
        experience: validatedPayload.experience,
        gender: validatedPayload.gender,
        appointmentFee: validatedPayload.appointmentFee,
        qualification: validatedPayload.qualification,
        currentWorkingPlace: validatedPayload.currentWorkingPlace,
        designation: validatedPayload.designation,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("user/create_doctor", {
      body: newFormData,
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function updateDoctor(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const payload: Partial<IDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };
    const validatedPayload = zodValidator(payload, updateDoctorZodSchema).data;

    const response = await serverFetch.patch(`doctor/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function softDeleteDoctor(id: string) {
  try {
    const response = await serverFetch.delete(`/doctor/soft/${id}`);
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export const getDoctors = async ()=> {
  try {
    const res = await serverFetch.get("doctor");
    return res.json();
  } catch (err) {
    console.log("Error fetching doctors:", err);
    return null;
  }
};
