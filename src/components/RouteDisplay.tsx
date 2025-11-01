import type { RouteStep } from "../datamodels/trip";
import type { ReactNode } from "react";
import { FlightOfferDisplay } from "./FlightOfferDisplay";
import { GoogleMapsRouteDisplay } from "./GoogleRouteDisplay";

export function RouteDisplay({ steps }: Readonly<{ steps: RouteStep[] }>) {
        return (
            <ol className="list-unstyled">
                {steps.map((step, index) => {
                    const key = `${step.travelMode}-${step.startLocation?.latitude ?? "na"}-${
                        step.startLocation?.longitude ?? "na"
                    }-${index}`;

                    let content: ReactNode;

                    if (step.travelMode === "FLIGHT") {
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
                        <li key={key} className="mb-3">
                            <div className="d-flex flex-column border p-2">
                                {content}
                            </div>
                        </li>
                    );
                })}
            </ol>
        );
}
