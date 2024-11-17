import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
    userId: string;
    isAdmin: boolean;
    exp: number;
}

export const getisAdminFromToken = (token: string): boolean | null => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded.isAdmin;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getisExpiredFromToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};