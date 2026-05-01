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
  },
})
