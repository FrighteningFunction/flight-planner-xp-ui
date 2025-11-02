import { type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./logic/queryBackend";
import "./App.css";
import { BACKEND_URL } from "./env";
import { RouteDisplay } from "./components/RouteDisplay";
import type { RouteStep } from "./datamodels/trip";
import { logger } from "./logging/logger";

if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

function App() {
  let content: ReactNode;

  const { data: steps, isLoading, error } = useQuery({
    queryKey: ["plannedRoute"],
    queryFn: async () =>{
      const data =  await apiFetch<{ route: RouteStep[] }>(`${BACKEND_URL}/get-test-route`);
      return data.route;
    }
  });

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error instanceof Error) {
    content = <p>Error: {error.message}</p>;
    logger.error("Error fetching planned route:", error);
  } else if (steps && steps.length > 0) {
    content = <RouteDisplay steps={steps} />;
  } else {
    content = <p>No route planned yet.</p>;
  }

  return <div className="container mt-3">{content}</div>;
}

export default App;

