import { type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./logic/queryBackend";
import { BACKEND_URL } from "./env";
import { RouteDisplay } from "./components/RouteDisplay";
import type { RouteStep } from "./datamodels/trip";
import { logger } from "./logging/logger";
import { RouteSearchPanel } from "./components/RouteSearchPanel";

if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

function App() {

  return <RouteSearchPanel />;
}

export default App;

