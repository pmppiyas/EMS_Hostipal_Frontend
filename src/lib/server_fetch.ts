import { ENV } from "@/config/env";
import { getCookie } from "@/utils/tokenHandlers";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;

  const accessToken = await getCookie("accessToken");

  return fetch(`${ENV.BACKEND_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
      cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    ...restOptions,
  });
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    return serverFetchHelper(endpoint, {
      ...options,
      method: "GET",
    });
  },

  post: async (endpoint: string, body?: any, options: RequestInit = {}) => {
    return serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch: async (endpoint: string, body?: any, options: RequestInit = {}) => {
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  put: async (endpoint: string, body?: any, options: RequestInit = {}) => {
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete: async (endpoint: string, options: RequestInit = {}) => {
    return serverFetchHelper(endpoint, {
      ...options,
      method: "DELETE",
    });
  },
};
