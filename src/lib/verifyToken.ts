import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  userId: string;
  name?: string;
  email: string;
  role: string;
  photo?: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}
