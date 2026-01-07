import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import setupLocator from "@locator/runtime";
import "./styles/globals.css";
import "./i18n";
import { QueryProvider } from "./providers/QueryProvider";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AlertProvider } from "./providers/AlertProvider";
import { HelmetProvider } from "react-helmet-async";
import { AppRouter } from "./routes";

if (import.meta.env.DEV) {
  setupLocator();
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider>
        <QueryProvider>
          <ThemeProvider defaultTheme="light" storageKey="nms-theme">
            <AlertProvider>
              <AppRouter />
            </AlertProvider>
          </ThemeProvider>
        </QueryProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
);
