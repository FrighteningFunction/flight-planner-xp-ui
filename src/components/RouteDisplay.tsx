import type { GenericRoute, RouteStep } from "../datamodels/trip";
import type { ReactNode } from "react";
import { FlightOfferDisplay } from "./FlightOfferDisplay";
import { GoogleMapsRouteDisplay } from "./GoogleRouteDisplay";

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

  return (
    content
  );
}

export function RouteDisplay({ route }: Readonly<{ route: GenericRoute }>) {
  if (!route || route.steps.length === 0) {
    return <p>No route found. Try another search.</p>;
  }

  return (
    <>
      {route.steps.map((step: RouteStep, index: any) => {
        const key = `${step.travelMode}-${
          step.startLocation?.latitude ?? "na"
        }-${step.startLocation?.longitude ?? "na"}-${index}`;

        return <RouteDisplayStep key={key} step={step} />;
      })}
    </>
  );
}
