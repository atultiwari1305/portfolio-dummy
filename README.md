# Atul Kumar Tiwari — Portfolio

A minimalist, interactive developer portfolio built as a clean, component-based codebase.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

> Requires Node 18.17+.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, anti-flash theme script, page chrome
│   ├── page.tsx            # composes the sections in order
│   └── globals.css         # theme tokens + base styles + atmospheric utilities
│
├── components/
│   ├── providers/          # cross-cutting client context
│   │   ├── ThemeProvider.tsx
│   │   ├── SmoothScroll.tsx     (Lenis)
│   │   ├── ToastProvider.tsx
│   │   └── Providers.tsx        (composes the above)
│   │
│   ├── layout/             # persistent chrome
│   │   ├── Background.tsx       (minimal static atmosphere)
│   │   ├── Cursor.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Navbar.tsx
│   │   ├── CommandPalette.tsx   (⌘K)
│   │   └── Footer.tsx
│   │
│   ├── ui/                 # reusable primitives
│   │   ├── Icons.tsx
│   │   ├── Reveal.tsx           (scroll-in animation)
│   │   ├── SectionHeading.tsx
│   │   ├── Counter.tsx          (count-up)
│   │   ├── MagneticButton.tsx
│   │   ├── TiltCard.tsx
│   │   ├── TypingRoles.tsx
│   │   ├── CopyButton.tsx
│   │   ├── TechMarquee.tsx      (scrolling logo marquee)
│   │   ├── ChatMock.tsx         (Coon product preview)
│   │   └── ArchitectureDiagram.tsx
│   │
│   └── sections/           # one file per page section
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Systems.tsx
│       ├── Credentials.tsx
│       └── Contact.tsx
│
├── data/
│   ├── resume.ts           # ← ALL content lives here (typed)
│   └── techIcons.ts        # bundled brand-logo SVG paths (marquee)
├── hooks/
│   └── useMediaQuery.ts
├── lib/
│   └── utils.ts            # cn, scrollToId, copyText, openResume
└── types/
    └── index.ts            # shared interfaces
```

---

## Editing content

Everything is data-driven. To update your portfolio, edit **`src/data/resume.ts`** only —
profile, stats, skills, experience, projects, education,
certifications and social links are all typed exports. The components render whatever
is in that file, so you rarely need to touch JSX.

---

## Theming

Colors are CSS variables defined per theme in `src/app/globals.css`
(`html[data-theme="dark"]` / `html[data-theme="light"]`) and surfaced to Tailwind as
named tokens (`bg`, `panel`, `line`, `ink`, `muted`, `accent`, …) in
`tailwind.config.ts`. Change the accent in one place:

```css
--accent: #54e0bd;
--accent-rgb: 84, 224, 189;   /* keep in sync — used for alpha + canvas */
```

Theme preference persists in `localStorage` and is applied before hydration via an
inline script (no flash of the wrong theme).

---

## Notes / things to personalize

- Replace the placeholder GitHub / "Architecture" project links in `resume.ts` with your
  real repository and live-demo URLs.
- A couple of stats are tasteful estimates (`500+` DSA problems, `20+` technologies) —
  set them to your real numbers in `stats`.
- Fonts (Clash Display + Satoshi via Fontshare, JetBrains Mono via Google) load through
  `<link>` tags in `layout.tsx`. Next will print a "custom font" lint warning — harmless;
  swap to `next/font/local` with self-hosted files if you want it gone.

---

## Deploy

Push to GitHub and import the repo on **Vercel** — zero configuration needed.

```bash
npm i -g vercel
vercel
```
