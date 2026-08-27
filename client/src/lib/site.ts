/** Single source of truth for contact details and canonical URLs. */

export const SITE_URL = "https://mikeships.vercel.app";

export const OWNER = "Mike Waitindi";

export const CONTACT = {
  email: "mikegary201@gmail.com",
  emailHref: "mailto:mikegary201@gmail.com",
  /** canonical phone format — used everywhere on the site */
  phone: "+254 792 618 156",
  phoneHref: "tel:+254792618156",
  whatsapp: "https://wa.me/254792618156",
  whatsappChat:
    "https://wa.me/254792618156?text=Hi%20Mike%2C%20I'd%20like%20to%20book%20a%2015-min%20chat.",
  linkedin: "https://linkedin.com/in/mike-waitindi-654bb2344",
  location: "Nairobi, Kenya · Remote",
} as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
