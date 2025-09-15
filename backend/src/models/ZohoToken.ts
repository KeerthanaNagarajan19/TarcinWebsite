import mongoose from "mongoose";

const ZohoTokenSchema = new mongoose.Schema(
  {
    accountId: { type: String, required: true, unique: true, index: true },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
    expiresAt: { type: Date, default: null }, // when access token expires
  },
  { timestamps: true }
);

const ZohoToken = mongoose.model("ZohoToken", ZohoTokenSchema);
export default ZohoToken;
