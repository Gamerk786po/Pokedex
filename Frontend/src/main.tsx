import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import PokedexBody from './components/body/body.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< App />}>
      <Route path='home' element = { < HomeBody />} />
      <Route path='user' element = {< UserBody />} />
      <Route path='pokedex' element = {< PokedexBody />} />
      <Route path='items' element= {< ItemBody />} />
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
