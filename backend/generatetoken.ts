// generateToken.ts
import { generateToken } from "./src/middleware/auth";

// Create a dummy user
const dummyUser = {
  id: "1",
  username: "adminUser",
  role: "admin", // Or use "user" if not admin
};

const token = generateToken(dummyUser);
console.log("Your Bearer Token:\n");
console.log("Bearer " + token);
