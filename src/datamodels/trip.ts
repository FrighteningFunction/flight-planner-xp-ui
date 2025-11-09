import type { FlightOffer, LatLng } from "./flight";
import type { GoogleRoute } from "./google-maps";
import type { Tag } from "./Tag";

export interface RouteStep {
    startLocation: LatLng;
    travelMode: "GROUND" | "FLIGHT";
    flightOffer?: FlightOffer;
    gMapsRoute?:GoogleRoute
}

export interface GenericRoute {
    id: string;
    steps: RouteStep[];
    tags: Tag[];
    createdAt: string;
}