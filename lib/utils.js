import { jwtVerify } from "jose";

export async function verifyToken(token) {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log({decodedToken})
    const userId = decodedToken?.issuer;
    return userId;
  }
  return null;
}


