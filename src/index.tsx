import { createRoot } from 'react-dom/client'
import { App } from './app'
import 'cirrus-ui'
import makeServer from 'src/utils/server'
import { StrictMode } from 'react'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

const container = document.getElementById('app')
const root = createRoot(container as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
