# Madrona Product Studio

Marketing site for Madrona Product Studio — a small, senior product studio based in the Pacific Northwest.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Project structure

```
src/
├── components/       # Shared UI components (Layout, cards, etc.)
├── data/             # Content as TypeScript data files
│   ├── caseStudies.ts   # Case study content and metadata
│   ├── offerings.ts     # Service offerings
│   └── writing.ts       # Articles / writing index
├── pages/            # Page components (one per route)
│   ├── Home.tsx
│   ├── Work.tsx
│   ├── CaseStudyPage.tsx
│   ├── Approach.tsx
│   ├── Writing.tsx
│   └── About.tsx
├── App.tsx           # Router configuration
├── main.tsx          # Entry point
└── index.css         # Tailwind imports and base styles
```

## Content

All content lives in `src/data/` as plain TypeScript files. Edit them directly — no CMS, no build step beyond Vite.

### Adding a new case study

1. Open `src/data/caseStudies.ts`
2. Add a new object to the `caseStudies` array following the `CaseStudy` interface
3. The slug becomes the URL: `/work/{slug}`
4. Done — the work grid and case study page are generated automatically

### Adding a writing entry

1. Open `src/data/writing.ts`
2. Add a new object to the `articles` array
3. Set the `url` to the external article link (e.g. LinkedIn)

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** for styling
- **React Router** for client-side routing

## Deployment

The site is configured for Vercel. Push to main and it deploys automatically (once connected).

For a production build:

```bash
npm run build
```

Output goes to `dist/`.
