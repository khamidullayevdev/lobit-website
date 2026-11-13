// Public site URL, used for canonical URLs, Open Graph, sitemap and robots.
// Order: NEXT_PUBLIC_SITE_URL (set this once you own a domain), then the Vercel
// production URL (e.g. lobbit.vercel.app, set automatically on Vercel), then localhost.
// Never default to a domain we don't own: search engines would treat it as the real site.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

// Public contact address. Unset until we own a domain, and contact links are hidden while it is.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;
