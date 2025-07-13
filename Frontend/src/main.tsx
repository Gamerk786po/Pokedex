import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PokemonProvider } from './context/PokemonContext/PokemonProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonProvider>
    <App />
    </PokemonProvider>
  </StrictMode>,
)
