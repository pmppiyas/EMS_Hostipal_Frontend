import { ENV } from "@/config/env";

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${ENV.BACKEND_URL}/auth/login`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
  });

  return await res.json();
};
