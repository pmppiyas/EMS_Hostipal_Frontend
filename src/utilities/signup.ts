import { ENV } from "@/config/env";

export const registerUser = async (data: any) => {
  try {
    const res = await fetch(`${ENV.BACKEND_URL}/auth/create_patient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err: any) {
    return { success: false, message: "Server error" };
  }
};
