"use server";

import { ENV } from "@/config/env";
import { getCookies } from '@/utils/tokenHandlers';

export const getMe = async () => {
  try {
    const accessToken = await getCookies("accessToken");

    if (!accessToken) {
      return { isAuthenticated: false };
    }

    const res = await fetch(`${ENV.BACKEND_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
