// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import eventRoutes from "./routes/eventRoutes";
import careerRoutes from "./routes/careerRoutes";
import storyRoutes from "./routes/storyRoutes";
import contactRoutes from "./routes/contactRoutes";
import courseRoutes from "./routes/coursesRoute";
import newsletterRoutes from "./routes/newsletterRoutes";
import pdfProxy from './routes/pdfProxy'; // Proxy for PDF handling
import path from "path";
import zohoAuthRoutes from "./routes/zohoAuth";
import diagnosticsRoutes from "./routes/diagnostics";
import newsletterDebugRoutes from "./routes/newsletterDebug";
import certificateRoutes from "./routes/certificateRoutes"; // <-- use the file above
import galleryRoutes from "./routes/galleryRoutes";

import bodyParser from "body-parser";

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://tarcin.in', 'https://certificate.tarcin.in'],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Welcome to Tarcin Backend!");
});

app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);          // Auth routes here too
app.use("/api/cms/blog", blogRoutes);
app.use("/api/cms/events", eventRoutes);
app.use("/api/cms/careers", careerRoutes);
app.use("/api/cms/community-stories", storyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cms/courses", courseRoutes);
app.use('/api', pdfProxy);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/newsletter", newsletterRoutes);

app.set('trust proxy', true);
// backend/src/app.ts

// Serve tarcinblue.png from the backend root
app.use(express.static(path.join(__dirname, "..")));

// ⚠️ Mount certificate API here:
app.use("/api/validateCertificate", certificateRoutes);
// ...


app.use("/api/gallery", galleryRoutes);

app.use(zohoAuthRoutes); // mounts /auth/zoho and /auth/zoho/callback
app.use(diagnosticsRoutes);
app.use(newsletterDebugRoutes);

console.log("✅ All routes mounted");

export default app;
