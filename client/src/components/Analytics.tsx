import { useEffect } from "react";

/**
 * Privacy-friendly analytics (Plausible, no cookies).
 * Loads only when VITE_PLAUSIBLE_DOMAIN is set — otherwise this
 * renders nothing and ships zero tracking. Set it to the production
 * domain (custom domain once it exists) in the Vercel env vars.
 */
export default function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
    if (!domain) return;
    if (document.querySelector('script[data-analytics="plausible"]')) return;
    const s = document.createElement("script");
    s.defer = true;
    s.dataset.analytics = "plausible";
    s.dataset.domain = domain;
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }, []);
  return null;
}
