# Case Study Assets

This folder contains the source content and images for the San Juan Islands Boating Guide case study.

## Structure

```
case-study/
├── case-study.md          # Full case study copy (markdown)
├── images/                # Screenshot assets
│   ├── README.md          # Screenshot capture guide
│   ├── 01-hero-homepage.png
│   ├── 02-marina-detail-card.png
│   ├── 03-restaurant-modal.png
│   └── 04-map-view.png
└── README.md              # This file
```

## Usage

The copy in `case-study.md` is the source of truth for the San Juan case study content. It gets translated into the structured TypeScript data in `src/data/caseStudies.ts` for rendering on the site.

Images in `images/` are also copied to `public/case-studies/san-juan-discovery-guide/` for use by the site.
