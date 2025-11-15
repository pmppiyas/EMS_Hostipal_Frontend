import { ENV } from "@/config/env";
import { getCookie } from "@/lib/tokenHandlers";
import { IUserToken } from "@/types/types";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<IUserToken | null> => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      return null;
    }

    const verifiedToken = jwt.verify(accessToken, ENV.JWT_SECRET) as JwtPayload;

    return {
      email: verifiedToken.email,
      role: verifiedToken.role,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
