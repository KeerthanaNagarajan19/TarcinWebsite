import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Optional overrides for special dev setups (proxy/HTTPS/tunnel)
// VITE_DEV_HMR_HOST: what the browser connects to (e.g. dev.example.com or 127.0.0.1)
// VITE_DEV_HMR_PORT: public port the browser uses (e.g. 443 behind HTTPS proxy)
// VITE_DEV_HMR_PROTOCOL: 'ws' or 'wss'
const HMR_HOST = process.env.VITE_DEV_HMR_HOST || "localhost";
const HMR_PORT = Number(process.env.VITE_DEV_HMR_PORT || 3000);
const HMR_PROTOCOL = (process.env.VITE_DEV_HMR_PROTOCOL || "ws") as "ws" | "wss";

// If your browser loads the app at http://localhost:3000, the defaults above are perfect.
// If you open via HTTPS (e.g., https://your-dev-domain), set:
//   VITE_DEV_HMR_PROTOCOL=wss
//   VITE_DEV_HMR_HOST=your-dev-domain
//   VITE_DEV_HMR_PORT=443

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",         // set to true if you want LAN access (0.0.0.0)
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: HMR_PROTOCOL,
      host: HMR_HOST,
      port: HMR_PORT,          // server-side HMR port
      clientPort: HMR_PORT,    // what the browser tries to connect to
    },
    proxy: {
      "/uploads": { 
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""), // Remove /api for uploads
      },
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // rewrite: (p) => p.replace(/^\/api/, "")
      },
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
    historyApiFallback: true,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  // build: { outDir: "dist" },
});
