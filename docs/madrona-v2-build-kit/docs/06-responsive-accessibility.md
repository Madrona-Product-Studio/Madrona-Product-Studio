# Responsive, accessibility, and performance requirements

## Breakpoints to test

- 375px
- 768px
- 1024px
- 1440px

## Accessibility

- Semantic heading order
- Real buttons for controls
- Correct tab semantics and ARIA relationships
- Visible keyboard focus
- WCAG AA contrast
- No status conveyed by color alone
- Descriptive alt text for meaningful images
- Empty alt text for decorative imagery
- Useful static content if interaction fails
- Respect `prefers-reduced-motion`

## Performance

- Use optimized WebP or AVIF assets
- Lazy-load lower-page demonstrations
- Prevent layout shift
- Avoid autoplay video and large animation dependencies
- Use existing React and CSS capabilities where practical
