if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => {
    window.location.reload();
  });
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
