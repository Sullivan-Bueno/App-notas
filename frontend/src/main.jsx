import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <div className="h-screen w-screen bg-[url(/imagem.jpg)] bg-cover flex">
      <StrictMode>
        <App />
      </StrictMode>
    </div>
  </CookiesProvider>,
);
