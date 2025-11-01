import type {LatLng} from "./generic-models"; // assuming you already have this defined

export interface Stop {
  name: string;
  location: {
    latLng: LatLng;
  };
}

export interface StopDetails {
  arrivalStop: Stop;
  departureStop: Stop;
  arrivalTime?: string;     // ISO 8601 string
  departureTime?: string;   // ISO 8601 string
}

export interface TransitDetails {
  stopDetails: StopDetails;
  headsign?: string;
  transitLine?: Record<string, any>;
  stopCount?: number;
}

export interface Step {
  transitDetails?: TransitDetails;
}

export interface Leg {
  steps: Step[];
}

export interface GoogleRoute {
  legs: Leg[];
  duration?: number; // in seconds
}

/**
 * Utility function to parse plain JSON into typed GoogleRoute.
 * This is optional — interfaces alone are compile-time only.
 */
export function parseGoogleRoute(obj: any): GoogleRoute {
  return {
    legs: (obj.legs || []).map((leg: any) => ({
      steps: (leg.steps || []).map((step: any) => ({
        transitDetails: step.transitDetails
          ? {
              stopDetails: {
                arrivalStop: step.transitDetails.stopDetails.arrivalStop,
                departureStop: step.transitDetails.stopDetails.departureStop,
                arrivalTime: step.transitDetails.stopDetails.arrivalTime,
                departureTime: step.transitDetails.stopDetails.departureTime,
              },
              headsign: step.transitDetails.headsign,
              transitLine: step.transitDetails.transitLine,
              stopCount: step.transitDetails.stopCount,
            }
          : undefined,
      })),
    })),
    duration: typeof obj.duration === "string"
      ? Number.parseFloat(obj.duration.replace("s", ""))
      : obj.duration,
  };
}
