import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

if (!convexUrl) {
  if (import.meta.env.PROD) {
    throw new Error("VITE_CONVEX_URL is not set.");
  }
  console.error("VITE_CONVEX_URL is not set. Portfolio forms will not work.");
}

const convex = new ConvexReactClient(
  convexUrl ?? "https://placeholder.convex.cloud",
);

createRoot(document.getElementById("root")!).render(
  <ConvexProvider client={convex}>
    <App />
  </ConvexProvider>
);
