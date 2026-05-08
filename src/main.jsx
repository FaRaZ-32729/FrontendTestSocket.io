import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DeviceProvider } from './context/DeviceContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </SocketProvider>
  </StrictMode>,
)
