import { useEffect } from "react";
import { absoluteUrl, OWNER, SITE_URL } from "@/lib/site";

interface SiteHeadProps {
  title: string;
  description: string;
  /** path (e.g. /work/kenyatrace) or absolute URL */
  canonical?: string;
  image?: string;
  type?: "website" | "article";
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps document title, description, canonical URL and Open Graph tags in sync
 * with the current page. Used by every route so shares/crawlers see real data.
 */
export default function SiteHead({
  title,
  description,
  canonical = "/",
  image = "/og-cover.png",
  type = "website",
}: SiteHeadProps) {
  useEffect(() => {
    const url = absoluteUrl(canonical);
    const img = absoluteUrl(image);

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", img);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", `${OWNER} — Portfolio`);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", img);
    upsertLink("canonical", url);
  }, [title, description, canonical, image, type]);

  return null;
}

export const DEFAULT_HEAD = {
  title: `${OWNER} — Web Developer & Frontend Engineer | Nairobi, Kenya`,
  description:
    "Nairobi-based web developer building reliable, accessible, responsive web products from design to deployment. React, TypeScript, REST APIs, testing, and Git→Vercel delivery. Two live products shipped.",
  canonical: SITE_URL,
};
