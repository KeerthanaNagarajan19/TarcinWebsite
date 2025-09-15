import "dotenv/config";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter";
import { randomBytes } from "crypto";

async function run() {
  const uri = process.env.MONGODB_URI!;
  if (!uri) throw new Error("MONGODB_URI missing");
  await mongoose.connect(uri);

  const updateOps: any[] = [];
  const cursor = Newsletter.find().cursor();

  let count = 0, changed = 0;
  for await (const sub of cursor) {
    count++;
    const needsPrefs = !sub.get("preferences");
    const needsUnsub = !sub.get("unsubToken");
    const needsConfirmFlag = typeof sub.get("confirmed") !== "boolean";
    const needsConfirmTokenCleanup = sub.get("confirmed") === true && sub.get("confirmToken");

    if (needsPrefs || needsUnsub || needsConfirmFlag || needsConfirmTokenCleanup) {
      const set: any = {};
      if (needsPrefs) {
        set["preferences"] = {
          blogs: true,
          events: true,
          courses: true,
          careers: true,
          frequency: (process.env.DIGEST_DEFAULT_FREQUENCY === "daily") ? "daily" : "weekly",
        };
      }
      if (needsUnsub) set["unsubToken"] = randomBytes(24).toString("hex");
      if (needsConfirmFlag) {
        const doubleOptIn = String(process.env.NEWSLETTER_DOUBLE_OPT_IN || "true") === "true";
        set["confirmed"] = !doubleOptIn; // if double opt-in OFF, confirm existing users
      }
      if (needsConfirmTokenCleanup) set["confirmToken"] = null;

      updateOps.push({
        updateOne: {
          filter: { _id: sub._id },
          update: { $set: set },
        }
      });
      changed++;
    }
  }

  if (updateOps.length) {
    await Newsletter.bulkWrite(updateOps);
  }

  console.log(`Newsletter migration done. scanned=${count}, changed=${changed}`);
  await mongoose.disconnect();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
