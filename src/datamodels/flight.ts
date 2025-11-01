export interface Distance {
  value: number;
  unit: string;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Currency {
  value: string;
}

export interface Fee {
  amount: number;
  type: string;
}

export interface Price {
  currency: Currency;
  total: number;
  base: number;
  fees: Fee[];
  grandTotal: number;
}

export interface Segment {
  departureIata: string;
  departureTerminal?: string;
  departureAt?: string;

  arrivalIata: string;
  arrivalTerminal?: string;
  arrivalAt?: string;

  carrierCode: string;
  flightNumber: string;
  aircraftCode?: string;
  operating?: Record<string, any>;

  duration?: string;
  id?: string;
  numberOfStops?: number;
  blacklistedInEU?: boolean;
}

export interface Itinerary {
  duration?: string;
  segments: Segment[];
}

export interface FlightOffer {
  type: string;
  id: string;
  price: Price;

  source?: string;
  instantTicketingRequired?: boolean;
  nonHomogeneous?: boolean;
  oneWay?: boolean;
  isUpsellOffer?: boolean;
  lastTicketingDate?: string;
  lastTicketingDateTime?: string;
  numberOfBookableSeats?: number;

  itineraries: Itinerary[];
  pricingOptions?: Record<string, any>;
  validatingAirlineCodes?: string[];
  travelerPricings?: Record<string, any>[];
}

export interface Address {
  cityName?: string;
  cityCode?: string;
  countryName?: string;
  countryCode?: string;
  regionCode?: string;
}

export interface Airport {
  name: string;
  detailedName: string;
  iataCode: string;
  geoCode: LatLng;
  address: Address;
  distance: Distance;
}