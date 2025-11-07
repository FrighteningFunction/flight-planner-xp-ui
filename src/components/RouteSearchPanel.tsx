import { type ReactNode } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { apiFetch, saveLastRoute } from "../logic/queryBackend";
import { BACKEND_URL } from "../env";
import { RouteDisplay } from "../components/RouteDisplay";
import type { GenericRoute, RouteStep } from "../datamodels/trip";
import { logger } from "../logging/logger";
import React from "react";
import { MultimodalRouteSearchControls } from "./MultiModalRouteSearchControls";
import type { Tag } from "../datamodels/Tag";

if (!BACKEND_URL) {
  logger.error("BACKEND_URL is not defined in environment variables.");
}

export function RouteSearchPanel() {
  const [tags, setTags] = React.useState<Tag[]>([]);

  const queryClient = new QueryClient();
   
  let routeDisplayPanel: ReactNode;

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const data = await apiFetch<GenericRoute>(
        `${BACKEND_URL}/get-route`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        },
      );
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['getTags']});
        
    },
  });

  const onClickSave = async () => {
    await saveLastRoute();
  }

  const saveButtonAndTags = (
    <button className="btn btn-primary" type="button" onClick={onClickSave}>
      Save
    </button>
  );

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
  } else if (mutation.data && mutation.data.steps.length > 0) {
    routeDisplayPanel = (
    <RouteDisplay route={mutation.data} />);
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
