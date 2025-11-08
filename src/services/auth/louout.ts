import { ENV } from "@/config/env";

export const logout = async () => {
  const res = await fetch(`${ENV.BACKEND_URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
  });
  return await res.json();
};
