// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in .env file");
// }

// // Extend JWT Payload
// interface JwtPayload extends DefaultJwtPayload {
//   id: string;
//   username: string;
//   role: string;
// }

// // ✅ Middleware to check if token is valid
// export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Authentication token required" });
//     return; // ✅ ensure function returns void here
//   }

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

//     // Store user info in request
//     (req as any).user = {
//       id: decoded.id,
//       username: decoded.username,
//       role: decoded.role,
//     };

//     next(); // ✅ middleware ends here with void
//   } catch (error) {
//     console.error("Authentication failed:", error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // ✅ Admin-only middleware
// export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
//   const user = (req as any).user;

//   if (!user || user.role !== "admin") {
//     res.status(403).json({ message: "Admin access required" });
//     return;
//   }

//   next(); // ✅ allow admin to proceed
// };

// // ✅ Function to generate JWT token for login
// export const generateToken = (user: { id: string; username: string; role: string }): string => {
//   return jwt.sign(
//     {
//       id: user.id,
//       username: user.username,
//       role: user.role,
//     },
//     JWT_SECRET,
//     { expiresIn: "24h" }
//   );
// };


import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

interface JwtPayload extends DefaultJwtPayload {
  id: string;
  username: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication token required" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    (req as any).user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }

  next();
};

export const generateToken = (user: { id: string; username: string; role: string }): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};
