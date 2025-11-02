import type { GoogleRoute, Leg, Step } from "../datamodels/google-maps";
import "bootstrap-icons/font/bootstrap-icons.css";

export function GoogleMapsRouteDisplay({
  googleRoute,
}: Readonly<{
  googleRoute: GoogleRoute;
}>) {
  return (
    <ol>
      {(googleRoute.legs || []).map((leg: Leg, legIndex: number) =>
        (leg.steps || []).map((step: Step, stepIndex: number) => (
          <li key={`${legIndex}-${stepIndex}`}>
            <GoogleMapsRouteStepDisplay step={step} />
          </li>
        ))
      )}
    </ol>
  );
}

function GoogleMapsRouteStepDisplay({ step }: { step: Step }) {
  let transitDetails = step.transitDetails;

  let stopDetails = transitDetails?.stopDetails;

  return (
    <div className="d-flex flex-column border p-2 mb-2 row-gap-2">
      <div className="d-flex flex-row align-items-center">
        <i className="bi bi-bus-front"></i>
        <p>{transitDetails?.transitLine?.vehicle?.name?.text}</p>
      </div>
      <p>Ride from </p>
      <p>{stopDetails?.departureStop?.name || ""}</p>
      <p>to</p>
      <p>{stopDetails?.arrivalStop?.name || ""}</p>
      <p>through {transitDetails?.stopCount} </p>
    </div>
  );
}
