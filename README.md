# Lobit website

Marketing site for Lobit. Next.js 15, TypeScript, Tailwind CSS v4, AOS for scroll reveals, Motion for UI animation.

```bash
npm install
npm run dev   # http://localhost:3000
```

- The site URL defaults to https://lobit.co. Set `NEXT_PUBLIC_SITE_URL` to override it (used for canonical URLs, sitemap and robots).
- The waitlist form doesn't save emails yet. Wire it to a Convex mutation in `src/components/Waitlist.tsx`.
