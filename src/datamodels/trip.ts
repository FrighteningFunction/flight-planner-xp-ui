import type { FlightOffer, LatLng } from "./flight";
import type { GoogleRoute } from "./google-maps";

export interface RouteStep {
    startLocation: LatLng;
    travelMode: "GROUND" | "FLIGHT";
    flightOffer?: FlightOffer;
    gMapsRoute?:GoogleRoute
}