import React from "react";
import type { Tag } from "../datamodels/Tag";
import type { GenericRoute } from "../datamodels/trip";
import { RouteTagsDisplay } from "./RouteTagsDisplay";
import { RouteDisplay } from "./RouteDisplay";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../logic/queryBackend";
import { BACKEND_URL } from "../env";
import { toastContext } from "./FlightPlannerToast";

function RouteListDisplay({
  routes,
  selectedId,
  setSelectedId,
}: Readonly<{
  routes: GenericRoute[];
  selectedId?: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>) {
  return (
    <div className="list-group">
      {routes.map((route) => (
        <RouteListElement
          key={route.id}
          route={route}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </div>
  );
}

function RouteListElement({
  route,
  selectedId,
  setSelectedId,
}: Readonly<{
  route: GenericRoute;
  selectedId?: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>) {
  const content = (
    <li
      className={
        "list-group-item d-flex flex-row gap-2 align-items-center" +
        (route.id === selectedId ? " active" : "")
      }
      onClick={() => setSelectedId(route.id)}
    >
      <strong>
        {route.searchStart} to {route.searchEnd}
      </strong>
      <div className="d-flex flex-row gap-1 ms-auto">
        {route.tags.map((tag) => (
          <span
            key={tag.id}
            className="d-flex flex-row align-items-center badge bg-light py-0 text-dark"
          >
            <i className="bi bi-tag-fill me-1"></i>
            {tag.name}
          </span>
        ))}
      </div>
    </li>
  );

  return content;
}

export function RouteCollectionDisplay() {
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    undefined
  );

  const { addToast } = React.useContext(toastContext);

  const [routes, setRoutes] = React.useState<GenericRoute[]>([]);

  const [selectedRoute, setSelectedRoute] = React.useState<
    GenericRoute | undefined
  >(undefined);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRoutes"],
    queryFn: async () => {
      const data = await apiFetch<GenericRoute[]>(`${BACKEND_URL}/routes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },
  });

  React.useEffect(() => {
    if (data) setRoutes(data);
  }, [data]);

  React.useEffect(() => {
    if (selectedId) {
      setSelectedRoute(routes.find((r) => r.id === selectedId));
    } else {
      setSelectedRoute(undefined);
    }
  }, [selectedId, routes]);

  React.useEffect(() => {
    if (error) {
      addToast("danger", `Error loading routes: ${(error as Error).message}`);
    }
  }, [error, addToast]);

  if (isLoading) {
    return <div>Loading routes...</div>;
  }

  if (error) {
    return <div className="text-danger">Error loading routes</div>;
  }

  let routeDisplay: React.ReactNode = <div>Select a route to see details</div>;

  let routeDetailsDisplay: React.ReactNode = <></>;

  if (selectedId) {
    if (selectedRoute) {
      routeDisplay = (
        <RouteDisplay route={selectedRoute} setRoute={setSelectedRoute} />
      );

      routeDetailsDisplay = (
        <div className="v-stack text-bg-light p-3 rounded">
          <div className="d-flex flex-row justify-content-between mb-2">
            <h5>Route Details</h5>
            <button
              className="btn border btn-danger d-flex align-items-center gap-2"
              onClick={() => setSelectedId(undefined)}
            >
              <span className="fs-5">Close</span>
              <i className="bi bi-x-circle text-light fs-5"></i>
            </button>
          </div>
          {routeDisplay}
        </div>
      );
    }
  }

  let content: React.ReactNode;

  if (!routes || routes.length === 0) {
    content = (
      <div className="container mt-3">
        <div className="alert alert-info" role="alert">
          No routes yet, time to start searching!
        </div>
      </div>
    );
  } else {
    content = (
      <div className="container mt-3">
        <div className="d-flex flex-column gap-4">
          <RouteListDisplay
            routes={routes}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
          {routeDetailsDisplay}
        </div>
      </div>
    );
  }

  return content;
}
