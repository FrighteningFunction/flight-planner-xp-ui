import type { FlightOffer, Segment } from "../datamodels/flight";
import "bootstrap-icons/font/bootstrap-icons.css";

function FlightSegmentDisplay({ segment }: Readonly<{ segment: Segment }>) {
  return (
    <div className="d-flex flex-column border p-2 mb-2 row-gap-2">
      <h3>Flight</h3>
      <div className="d-flex flex-row align-items-center">
        <p> depart at {segment.departureAt}</p>
        <i className="bi bi-clock"></i>
      </div>
      <div className="d-flex flex-row align-items-center">
        <p> arrive at {segment.arrivalAt}</p>
        <i className="bi bi-clock"></i>
      </div>
      <p> departure IATA code : {segment.departureIata}</p>
      <p>
        departure terminal : {segment.departureTerminal}
        <i className="bi bi-door-open-fill"></i>
      </p>
      <br />
      <p>arrival IATA code : {segment.arrivalIata}</p>
      <p>
        arrival terminal : {segment.arrivalTerminal}
        <i className="bi bi-door-open-fill"></i>
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
    <div className="d-flex flex-column border p-2 mb-2 row-gap-2">
      <p className="d-flex flex-row align-items-between gap-1">
        <h3>Flight</h3>
        <i className="bi bi-airplane-engines"></i>
      </p>
      <p>
        Total Price:{" "}
        {String(flightoffer.price.total)}
      </p>
      <div>
        <h3>Itineraries</h3>
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
