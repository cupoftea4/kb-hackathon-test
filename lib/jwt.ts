import { JWT_SECRET } from "@/constants";
import jwt from "jsonwebtoken";

export const signJwt = async (payload: object, expiresIn = "1d") => {
  const token = jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS512",
    expiresIn,
  });
  return token;
};
