import { ENV } from "@/config/env";

export const checkAuthStatus = async () => {
  try {
    const res = await fetch(`${ENV.BACKEND_URL}/auth/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      return {
        isAuthenticated: true,
        user: data.data,
      };
    } else {
      return { isAuthenticated: false };
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return { isAuthenticated: false };
  }
};
