import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // Base path for GitHub Pages — repo is "Portfolio" so site lives at /Portfolio/
  // Change to '/' if you rename the repo to SajbenDani.github.io
  base: '/Portfolio/',
  plugins: [react(), tailwindcss()],
  server: {
    // Tool state and build output are not app sources; don't full-reload on them.
    watch: { ignored: ['**/.impeccable/**', '**/.code-review-graph/**', '**/uploads/**', '**/dist/**', '**/*.tsbuildinfo', '**/tasks/**'] },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // GSAP + plugins change rarely; keep them in their own cacheable chunk.
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollSmoother', 'gsap/SplitText', 'gsap/Flip', '@gsap/react'],
        },
      },
    },
  },
})
