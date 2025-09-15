import express from "express";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  previewDigest,
  sendDigestNow,
  sendTestMail,
  adminListSubscribers,
  adminUpdateSubscriber,
  adminDeleteSubscriber,
} from "../controllers/newsletterController";

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);

// Admin endpoints (protect with auth middleware in production)
router.get("/admin/list", adminListSubscribers);
router.patch("/admin/:id", adminUpdateSubscriber);
router.delete("/admin/:id", adminDeleteSubscriber);

router.get("/preview-digest", previewDigest);
router.post("/send-digest", sendDigestNow);
router.get("/send-test", sendTestMail);

export default router;