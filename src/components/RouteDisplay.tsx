import type { GenericRoute, RouteStep } from "../datamodels/trip";
import type { ReactNode } from "react";
import { FlightOfferDisplay } from "./FlightOfferDisplay";
import { GoogleMapsRouteDisplay } from "./GoogleRouteDisplay";
import { RouteTagsDisplay, RouteTagsDropdown } from "./RouteTagsDisplay";
import type { Tag } from "../datamodels/Tag";
import { toastContext } from "./FlightPlannerToast";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "../logging/logger";
import { saveRoute } from "../logic/queryBackend";

function RouteDisplayStep({ step }: Readonly<{ step: RouteStep }>) {
  let content: ReactNode;

  if (step === undefined) {
    return <></>;
  } else if (step.travelMode === "FLIGHT") {
    content = step.flightOffer ? (
      <FlightOfferDisplay flightoffer={step.flightOffer} />
    ) : (
      <p className="text-muted">No flight details available.</p>
    );
  } else {
    // GROUND
    content = step.gMapsRoute ? (
      <GoogleMapsRouteDisplay googleRoute={step.gMapsRoute} />
    ) : (
      <p className="text-muted">No ground route details available.</p>
    );
  }

  return content;
}

export function RouteDisplay({
  route,
  setRoute,
}: Readonly<{ route: GenericRoute; setRoute: (route: GenericRoute) => void }>) {
  if (!route || route.steps.length === 0) {
    return <p>No route found. Try another search.</p>;
  }

  const queryClient = useQueryClient();

  const { addToast } = React.useContext(toastContext);

  const updateRouteTags = (newTags: Tag[]) => {
    if (route) {
      setRoute({ ...route, tags: newTags });
    }
    queryClient.invalidateQueries({ queryKey: ["getRoutes"] });
  };

  const onClickSave = async () => {
    if (!route) {
      logger.warn("No route to save.");
      return;
    }
    // update route id here too
    let route_id: number | undefined = undefined;
    try {
      route_id = await saveRoute(route);
    } catch (e) {
      addToast("danger", `Error saving route: ${(e as Error).message}`);
      return;
    }
    if (route_id) addToast("success", "Route saved successfully");

    if (!route.id) {
      let new_route = route;
      new_route.id = String(route_id);
      setRoute(new_route);
    }
    logger.info(`Route saved with ID: ${route_id}`);
  };

  const routeTagsDisplay = (
    <>
      <RouteTagsDisplay tags={route.tags} setTags={updateRouteTags} />
      <RouteTagsDropdown
        currentTags={route.tags}
        setRouteTags={updateRouteTags}
      />
    </>
  );

  let saveButtonAndTags: ReactNode = <></>;

  if (route && route.steps.length > 0) {
    const buttonText = route.id ? "Update Route" : "Save Route";
    saveButtonAndTags = (
      <button
        className="btn btn-primary align-self-start"
        type="button"
        onClick={onClickSave}
      >
        {buttonText}
      </button>
    );
  }

  const mainBody = (
    <>
      <h3>
        {route.searchStart} to {route.searchEnd}
      </h3>
      {route.steps.map((step: RouteStep, index: any) => {
        const key = `${step.travelMode}-${
          step.startLocation?.latitude ?? "na"
        }-${step.startLocation?.longitude ?? "na"}-${index}`;

        return <RouteDisplayStep key={key} step={step} />;
      })}
    </>
  );

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex fley-row gap-1">
        {routeTagsDisplay}
        {saveButtonAndTags}
      </div>
      {mainBody}
    </div>
  );
}
