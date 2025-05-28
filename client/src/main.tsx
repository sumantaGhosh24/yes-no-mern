import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import "./index.css";
import App from "./App";
import ThemeProvider from "./components/theme-provider";
import PrimaryColorProvider from "./components/primary-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <PrimaryColorProvider>
        <App />
      </PrimaryColorProvider>
    </ThemeProvider>
  </StrictMode>
);
