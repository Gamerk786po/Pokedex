import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import PokedexBody from "./components/PokedexBody/PokedexBody.tsx";
import HomeBody from "./components/HomeBody/HomeBody.tsx";
import ProfileBody from "./components/ProfileBody/ProfileBody.tsx";
import ItemBody from "./components/ItemBody/ItemBody.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="home" element={<HomeBody />} />
      <Route path="user" element={<ProfileBody />} />
      <Route path="pokedex" element={<PokedexBody />} />
      <Route path="item" element={<ItemBody />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
