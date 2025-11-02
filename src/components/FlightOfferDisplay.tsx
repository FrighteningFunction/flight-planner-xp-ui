import type { FlightOffer, Segment } from "../datamodels/flight";
import "bootstrap-icons/font/bootstrap-icons.css";

function FlightSegmentDisplay({ segment }: Readonly<{ segment: Segment }>) {

  const carrierInfoBadge = (
    <span className="badge text-bg-info fs-6 mx-3">
      {segment.carrier_code}
    </span>)

  let arrivalAt = segment.arrival_at ? new Date(segment.arrival_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }) : "Unknown time";

  let departureAt = segment.departure_at ? new Date(segment.departure_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }) : "Unknown time";

  return (
    <div className="d-flex flex-column p-2 mb-2 row-gap-1 align-items-start">
      <h4>Flight
        {carrierInfoBadge}
      </h4>
      <p>From: {segment.departure_iata}</p>
      <p>To: {segment.arrival_iata}</p>

      <div className="d-flex flex-row align-items-baseline">
        <i className="bi bi-clock me-2"></i>
        <p>depart at {departureAt}</p>
      </div>

      <div className="d-flex flex-row align-items-baseline">
        <i className="bi bi-clock me-2"></i>
        <p>arrive at {arrivalAt}</p>
      </div>


      <p>
        <i className="bi bi-door-open-fill me-2" style={{color: "blue"}}></i>
        departure terminal: {segment.departure_terminal ?? "—"}{" "}
      </p>
      <p>
        <i className="bi bi-door-open-fill me-2" style={{color: "blue"}}></i>
        arrival terminal: {segment.arrival_terminal ?? "—"}{" "}
      </p>
    </div>
  );
}


export function FlightOfferDisplay({
  flightoffer,
}: Readonly<{
  flightoffer: FlightOffer;
}>) {
  return (
    <div className="d-flex flex-column p-2 mb-2 row-gap-1">
      <div className="d-flex flex-row align-items-baseline gap-1">
        <i className="bi bi-airplane-engines fs-4"></i>
        <h4>Flight</h4>
      </div>
      <p className="text-lg-start flex-row align-items-baseline fs-5">
        <i className="bi bi-cash me-1 fs-3" style={{color: "green"}}></i>
        Total Price:{" "}
        {String(flightoffer.price.total)}
        {" "}
        {String(flightoffer.price.currency)}
      </p>
      <div>
        <h5 className="text-lg-start">Itineraries</h5>
        {flightoffer.itineraries.map((itinerary) =>
          (itinerary.segments || []).map((segment, segindex) => (
            <ul className="list-group" key={segindex}>
              <li className="list-group-item">
                <FlightSegmentDisplay segment={segment} />
              </li>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}
