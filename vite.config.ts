import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Name the shared chunks honestly. Without this the bundler labels
        // the React runtime after an arbitrary first module
        // ("MadronaLogo-*.js") and the shared site CSS after useCalEmbed.
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|cookie|set-cookie-parser|turbo-stream)[\\/]/,
            },
            {
              // The chrome every page shares: nav, footer, logo, meta, theme,
              // analytics, the v3 stylesheet.
              name: 'site-shared',
              test: /src[\\/](lib[\\/]|data[\\/](booking|siteMeta)|components[\\/]|pages[\\/]lab[\\/](M2Nav|MadronaLogo|SiteFooter|LabMeta|SkySwitcher|useCalEmbed|madrona-v2\.css)|pages[\\/]v3[\\/](Reveal|v3\.css))/,
            },
          ],
        },
      },
    },
  },
})
