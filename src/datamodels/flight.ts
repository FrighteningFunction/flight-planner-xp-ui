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
  grand_total: number;
}

export interface Segment {
  departure_iata: string;
  departure_terminal?: string;
  departure_at?: string;

  arrival_iata: string;
  arrival_terminal?: string;
  arrival_at?: string;

  carrier_code: string;
  flight_number: string;
  aircraft_code?: string;
  operating?: Record<string, any>;

  duration?: string;
  id?: string;
  number_of_stops?: number;
  blacklisted_in_eu?: boolean;
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
  instant_ticketing_required?: boolean;
  non_homogeneous?: boolean;
  one_way?: boolean;
  is_upsell_offer?: boolean;
  last_ticketing_date?: string;
  last_ticketing_date_time?: string;
  number_of_bookable_seats?: number;

  itineraries: Itinerary[];
  pricing_options?: Record<string, any>;
  validating_airline_codes?: string[];
  traveler_pricings?: Record<string, any>[];
}

export interface Address {
  city_name?: string;
  city_code?: string;
  country_name?: string;
  country_code?: string;
  region_code?: string;
}

export interface Airport {
  name: string;
  detailed_name: string;
  iata_code: string;
  geo_code: LatLng;
  address: Address;
  distance: Distance;
}
