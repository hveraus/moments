import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TicketGallery } from './TicketGallery'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TicketGallery />
  </StrictMode>,
)
