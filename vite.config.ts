import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // Base path for GitHub Pages — repo is "Portfolio" so site lives at /Portfolio/
  // Change to '/' if you rename the repo to SajbenDani.github.io
  base: '/Portfolio/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    // Force a single React instance across pre-bundled deps (R3F, drei,
    // use-gesture, framer-motion) — otherwise hooks throw "Invalid hook call".
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@use-gesture/react', 'framer-motion'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split the heavy WebGL stack into its own cacheable chunk.
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
