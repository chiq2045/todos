import { createRoot } from 'react-dom/client'
import { App } from './app'
import { StrictMode } from 'react'

const container = document.getElementById('app')
const root = createRoot(container as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
