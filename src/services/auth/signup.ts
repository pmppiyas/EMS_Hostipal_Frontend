import { ENV } from "@/config/env";
import { loginUser } from "@/services/auth/login";

export const registerPatient = async (data: any) => {
  try {
    const res = await fetch(`${ENV.BACKEND_URL}/user/create_patient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      const loginResult = await loginUser({
        email: data.email,
        password: data.password,
      });

      return loginResult;
    }

    return result;
  } catch (err) {
    return { success: false, message: "Server error" };
  }
};
