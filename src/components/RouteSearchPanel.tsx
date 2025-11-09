import { type ReactNode } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { apiFetch, saveRoute } from "../logic/queryBackend";
import { BACKEND_URL } from "../env";
import { RouteDisplay } from "../components/RouteDisplay";
import type { GenericRoute } from "../datamodels/trip";
import { logger } from "../logging/logger";
import React from "react";
import { MultimodalRouteSearchControls } from "./MultiModalRouteSearchControls";
if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

export function RouteSearchPanel() {

  const [route, setRoute] = React.useState<GenericRoute | undefined>(undefined);

  const queryClient = new QueryClient();

  let routeDisplayPanel: ReactNode;

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const data = await apiFetch<GenericRoute>(`${BACKEND_URL}/get-route`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return data;
    },
    onSuccess(data) {
      setRoute(data);
      queryClient.invalidateQueries({ queryKey: ["getTags"] });
    },
  });

  const onClickSave = async () => {
    if (!route) {
      logger.warn("No route to save.");
      return;
    }
    // update route id here too
    let route_id = await saveRoute(route);
    let new_route = route;
    new_route.id = String(route_id);
    setRoute(new_route);
    logger.info(`Route saved with ID: ${route_id}`);
  };

  let saveButtonAndTags: ReactNode;

  if (route && route.steps.length > 0) {
    saveButtonAndTags = (
      <button
        className="btn btn-primary align-self-end"
        type="button"
        onClick={onClickSave}
      >
        Save This Route
      </button>
    );
  }

  const handleSearchClick = (
    origin: string,
    destination: string,
    date: string
  ) => {
    mutation.mutate({ origin, destination, date });
  };

  if (mutation.isPending) {
    routeDisplayPanel = <p>Loading...</p>;
  } else if (mutation.isError) {
    routeDisplayPanel = (
      <div className="alert alert-danger" role="alert">
        {mutation.error.message}
      </div>
    );
    logger.error("Error fetching planned route:", mutation.error);
  } else if (route && route.steps.length > 0) {
    routeDisplayPanel = <RouteDisplay route={route} />;
  } else {
    routeDisplayPanel = <p>No route planned yet.</p>;
  }

  const content = (
    <div className="d-flex flex-column gap-4 my-2">
      <MultimodalRouteSearchControls
        searchMultiModalRoute={handleSearchClick}
      />
      {saveButtonAndTags}
      {routeDisplayPanel}
    </div>
  );

  return <div className="container mt-3">{content}</div>;
}
