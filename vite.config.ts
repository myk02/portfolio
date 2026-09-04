import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname), "");
  const convexUrl = process.env.VITE_CONVEX_URL ?? env.VITE_CONVEX_URL;
  if (command === "build" && !convexUrl) {
    throw new Error("VITE_CONVEX_URL is required to build.");
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist", "public"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-motion": ["framer-motion"],
            "vendor-convex": ["convex"],
          },
        },
      },
    },
    server: {
      // 5173 is often reserved by Windows Hyper-V (excluded TCP ranges),
      // which yields EACCES instead of a busy-port retry.
      port: 3000,
      strictPort: false,
      host: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
