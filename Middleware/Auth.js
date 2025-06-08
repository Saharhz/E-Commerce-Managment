import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("🛡️ verifyToken middleware running");
  console.log("Authorization Header:", req.headers.authorization);
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token.trim(), JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({ message: "Invalid or expired token" });
  }
};

export const RoleGuard = (role) => {
  return async (request, response, next) => {
    try {
      let user = request.user;
      if (user.role != role) return response.status(403).send("Wrong role");
      next();
    } catch (error) {
      return response.status(500).send("Server Error");
    }
  };
};
