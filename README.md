# Lobbit website

Marketing site for Lobbit. Next.js 15, TypeScript, Tailwind CSS v4, AOS for scroll reveals, Motion for UI animation.

```bash
npm install
npm run dev   # http://localhost:3000
```

- The site URL comes from `NEXT_PUBLIC_SITE_URL`; on Vercel it falls back to the project's production URL (used for canonical URLs, sitemap and robots). Set it once there is a real domain.
- The waitlist form saves emails to Convex (`convex/waitlist.ts`). Run `npx convex dev` alongside `npm run dev`; it writes `NEXT_PUBLIC_CONVEX_URL` to `.env.local`.
- Contact links (FAQ, footer) only show when `NEXT_PUBLIC_CONTACT_EMAIL` is set. Leave it unset until there is a real inbox.

## Deploying

1. `npx convex deploy` pushes `convex/` to the production Convex deployment.
2. On the host (Vercel), set `NEXT_PUBLIC_CONVEX_URL` to the production Convex URL (Convex dashboard → production → Settings → URL). Then deploy the site.
