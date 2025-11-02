import type { FlightOffer, Segment } from "../datamodels/flight";
import "bootstrap-icons/font/bootstrap-icons.css";

function FlightSegmentDisplay({ segment }: Readonly<{ segment: Segment }>) {
  return (
    <div className="d-flex flex-column p-2 mb-2 row-gap-2 align-items-start">
      <h4>Flight</h4>

      <div className="d-flex flex-row align-items-baseline">
        <i className="bi bi-clock me-2"></i>
        <p>depart at {segment.departure_at}</p>
      </div>

      <div className="d-flex flex-row align-items-baseline">
        <i className="bi bi-clock me-2"></i>
        <p>arrive at {segment.arrival_at}</p>
      </div>

      <p>departure IATA code: {segment.departure_iata}</p>

      <p>
        departure terminal: {segment.departure_terminal ?? "—"}{" "}
        <i className="bi bi-door-open-fill ms-2"></i>
      </p>

      <br />

      <p>arrival IATA code: {segment.arrival_iata}</p>

      <p>
        arrival terminal: {segment.arrival_terminal ?? "—"}{" "}
        <i className="bi bi-door-open-fill ms-2"></i>
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
