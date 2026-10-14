import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter/opsz.css'
import './index.css'
import { MQ } from '@/lib/motion'
import { initSmoothScroll } from '@/lib/smooth'
import App from './App'

// One switch for CSS and JS: <html data-motion="full|reduce">.
const reduce = window.matchMedia(MQ.reduce)
const syncMotion = () => {
  document.documentElement.dataset.motion = reduce.matches ? 'reduce' : 'full'
}
syncMotion()
reduce.addEventListener('change', syncMotion)

// The smoother must exist before the chapters create their pinned triggers.
initSmoothScroll()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
