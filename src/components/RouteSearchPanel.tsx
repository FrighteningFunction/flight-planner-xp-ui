import { type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../logic/queryBackend";
import { BACKEND_URL } from "../env";
import { RouteDisplay } from "../components/RouteDisplay";
import type { RouteStep } from "../datamodels/trip";
import { logger } from "../logging/logger";
import React from "react";
import { MultimodalRouteSearchControls } from "./MultiModalRouteSearchControls";

if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

export function RouteSearchPanel() {
  let routeDisplayPanel: ReactNode;

  const {
    data: steps,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["plannedRoute"],
    queryFn: async () => {
      const data = await apiFetch<{ route: RouteStep[] }>(
        `${BACKEND_URL}/get-test-route`
      );
      return data.route;
    },
    enabled: false,
  });

  const handleSearchClick = (origin: string, destination: string, date: string) => {
    refetch();
  };

  if (isLoading) {
    routeDisplayPanel = <p>Loading...</p>;
  } else if (error instanceof Error) {
    routeDisplayPanel = <p>Error: {error.message}</p>;
    logger.error("Error fetching planned route:", error);
  } else if (steps && steps.length > 0) {
    routeDisplayPanel = <RouteDisplay steps={steps} />;
  } else {
    routeDisplayPanel = <p>No route planned yet.</p>;
  }

  const content = (
    <div className="d-flex flex-column gap-4 my-2">
      <MultimodalRouteSearchControls
        searchMultiModalRoute={handleSearchClick}
      />
      {routeDisplayPanel}
    </div>
  );

  return <div className="container mt-3">{content}</div>;
}
