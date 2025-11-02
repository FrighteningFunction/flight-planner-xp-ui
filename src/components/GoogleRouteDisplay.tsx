import type React from "react";
import type { GoogleRoute, Leg, Step } from "../datamodels/google-maps";
import "bootstrap-icons/font/bootstrap-icons.css";

export function GoogleMapsRouteDisplay({
  googleRoute,
}: Readonly<{
  googleRoute: GoogleRoute;
}>) {
  return (
    <ol className="list-group">
      {(googleRoute.legs || []).map((leg: Leg, legIndex: number) =>
        (leg.steps || []).map((step: Step, stepIndex: number) => (
          <GoogleMapsRouteStepDisplay
            key={`${legIndex}-${stepIndex}`}
            step={step}
          />
        ))
      )}
    </ol>
  );
}

function GoogleMapsRouteStepDisplay({ step }: { step: Step }) {
  let transitDetails = step.transitDetails;

  let stopDetails = transitDetails?.stopDetails;

  let arrivalTimeRaw = stopDetails?.arrivalTime;
  let arrivalTime = arrivalTimeRaw
  ? new Date(arrivalTimeRaw).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })
  : "Unknown time";

  if (step.transitDetails === null) {
    return <></>;
  }

  return (
    <li className="list-group-item">
      <div className="d-flex flex-column p-2">
        <div className="d-flex flex-column p-2 mb-2 row-gap-2 align-items-start">
          <div className="d-flex flex-row align-items-baseline">
            <i className="bi bi-bus-front fs-4"></i>
            <span className="badge text-bg-secondary fs-6 mx-3">
              {transitDetails?.transitLine?.vehicle?.name?.text}
            </span>
            <span className="badge text-bg-info text-bg-orange fs-6 mx-3">
              {transitDetails?.transitLine?.name}
            </span>
          </div>
          <p className="text-lg-start">
            at <strong>{arrivalTime || ""}</strong>
          </p>
          <p>
            Ride from <strong>{stopDetails?.departureStop?.name || ""}</strong>{" "}
            to <strong>{stopDetails?.arrivalStop?.name || ""}</strong>
          </p>
          <p>
            through <mark>{transitDetails?.stopCount} stops</mark>
            <i className="bi bi-sign-stop-fill fs-6 ms-1" style={{ color: "red" }}></i>
          </p>
        </div>
      </div>
    </li>
  );
}
