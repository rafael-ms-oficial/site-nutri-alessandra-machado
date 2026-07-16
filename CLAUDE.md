# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack, default bundler for this Next.js version) at http://localhost:3000
- `npm run build` — production build
- `npm start` — serve the production build (run `build` first)
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + typescript configs)
- `npx tsc --noEmit` — type-check only (no dedicated `typecheck` script exists)
- No test framework is configured in this repo — don't assume Jest/Vitest exist.

## Architecture

**Two surfaces in one app**: a public marketing site (`/`, `/blog`, `/blog/[slug]`) and a client-rendered admin CMS (`/admin/**`) gated by Supabase Auth.

**Homepage composition**: `src/app/page.tsx` stacks section components in order (Navbar, Hero, SocialProof, Services, About, Quiz, BlogPreview, CtaFinal, Footer, WhatsAppFloat). Only sections mounted on the homepage register the scroll-anchor ids `sobre`, `servicos`, `quiz`, `contato` (in About, Services, Quiz, CtaFinal respectively). Because Navbar/Footer render on every route, their links use `/#id` (not bare `#id`) so they still resolve to the homepage from `/blog` or a post.

**Anchor-link scrolling**: `next/link` won't re-trigger a scroll when the clicked hash already matches the current URL (e.g. clicking a `#quiz` link twice). `src/lib/scrollToHash.ts` (`handleHashLinkClick`) works around this — it's wired into `Button`, `Navbar`, and `Footer` link `onClick`s, and manually calls `scrollIntoView` + `history.pushState` when the target id exists on the current page, falling back to normal `Link` navigation otherwise.

**WhatsApp is the single conversion channel**. `src/lib/contact.ts` exports `WHATSAPP_LINK`, `INSTAGRAM_URL`, `CRN_LABEL` — always reuse these constants rather than hardcoding the number/handle.

**Quiz funnel** (`src/components/sections/Quiz.tsx`): 3 questions → lead form (name/phone/email) → simulated "analyzing" delay → reveals a WhatsApp CTA. It currently holds lead data only in component state and does **not** insert into Supabase, even though a `leads` table is defined in the schema — treat wiring that up as a TODO, not existing behavior.

**Blog is hardcoded, not yet Supabase-backed**: both `src/components/blog/BlogGrid.tsx` (index/listing) and `src/app/blog/[slug]/page.tsx` (post view, via a `samplePost` object) use static in-file data despite a `posts` table existing in Supabase. Don't assume blog content is dynamic without checking.

**Admin CMS** (`src/app/admin/**`): `AdminLayout` sets `dynamic = "force-dynamic"` and `robots: noindex`. Each page independently calls `supabase.auth.getUser()` client-side and redirects to `/admin/login` if unauthenticated — there is no middleware/server-side route protection, so new admin pages must repeat this guard themselves.

**Supabase clients** — pick the right one per component type:
- `src/lib/supabase/client.ts` — browser client, memoized on `globalThis` to survive HMR in dev.
- `src/lib/supabase/server.ts` — server client, cookie-based via `next/headers` (`async`, must be awaited).

**Data model**: `posts` and `leads` tables, RLS policies, and a `posts` storage bucket are defined in `src/lib/supabase/schema.sql`, applied manually via the Supabase SQL editor — there is no migration tooling.

**UI primitives** (`src/components/ui/`): `Button` (variant/size + optional `href`; renders `<a target="_blank">` when `external`, a `next/link` `Link` for internal/anchor hrefs, or a plain `<button>` otherwise), `Container`, `SectionWrapper` (background/spacing/`id` for homepage sections), `SectionTitle`, `Card`.

**Design tokens are defined twice**: as named Tailwind colors in `tailwind.config.ts` (`burgundy`, `rose-gold`, `soft-pink`, `light-beige`, `text-dark`, `text-muted`) and as raw hex literals inline throughout most components (`#7A2F2F`, `#F4EBE2`, `#D2B09F`, `#6B6B6B`, `#2A2A2A`, `#FAF7F2`). Most section components use the hex literals directly rather than the Tailwind class names — when changing a brand color, grep for the hex value, not just the token name.

**Fonts**: Cormorant Garamond (`--font-cormorant`, headings) and Poppins (`--font-poppins`, body), loaded via `next/font/google` in `src/app/layout.tsx`.

**Env vars** (see `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
