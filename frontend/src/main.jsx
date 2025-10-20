import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import SideBar from "./components/SideBar.jsx";


createRoot(document.getElementById("root")).render(
  <div className="h-screen w-screen bg-[url(imagem.jpg)] flex">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
);
