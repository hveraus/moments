import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (reliable across Chrome & Safari)
import '@fontsource/lxgw-wenkai/300.css'
import '@fontsource/lxgw-wenkai/700.css'
import '@fontsource/noto-sans-sc/300.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/500.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-serif-sc/400.css'
import '@fontsource/noto-serif-sc/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
