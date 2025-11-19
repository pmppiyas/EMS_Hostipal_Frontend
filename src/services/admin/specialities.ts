"use server";

import { serverFetch } from "@/lib/server_fetch";
import { zodValidator } from "@/utils/ZodValidator";
import { createSpecialityZodSchema } from "@/zod/specility.validation";

export async function createSpeciality(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
    };

    // Zod client-side validation
    const validation = zodValidator(payload, createSpecialityZodSchema);
    if (!validation.success) return validation;

    const validatedPayload = validation.data;

    if (!validatedPayload) {
      return {
        success: false,
        message: "Validation data is missing",
      };
    }
    console.log("Validated Payload=>>>>>>", validatedPayload);
    // Prepare FormData for backend
    const newFormData = new FormData();
    newFormData.append("title", validatedPayload.title as string);
    // const actualPayload = newFormData.get("title");
    // console.log("Actual payload=>>>>>>", actualPayload);

    const file = formData.get("file");
    if (file instanceof Blob) newFormData.append("file", file);

    // Send to backend
    const response = await serverFetch.post("specialities", {
      body: newFormData,
    });

    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function getSpecialities() {
  try {
    const response = await serverFetch.get("specialities");
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

export async function deleteSpeciality(id: string) {
  try {
    const response = await serverFetch.delete(`specialities/${id}`);
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
