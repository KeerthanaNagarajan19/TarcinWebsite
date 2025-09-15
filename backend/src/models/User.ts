// import mongoose, { Document, Model, Schema } from "mongoose";
// import bcrypt from "bcryptjs";

// // 1. Define the interface for the user document
// export interface IUser extends Document {
//   username: string;
//   password: string;
//   role: "admin" | "user";
//   profilePicture?: string;
//   comparePassword: (password: string) => Promise<boolean>;
// }

// // 2. Define the schema
// const userSchema: Schema<IUser> = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "user"], default: "user" },
//   profilePicture: { type: String, default: "" },
// });

// // 3. Instance method to compare password
// userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
//   return await bcrypt.compare(password, this.password);
// };

// // 5. Export the model
// const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
// export default User;


import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "user";
  profilePicture?: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profilePicture: { type: String, default: "" },
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
