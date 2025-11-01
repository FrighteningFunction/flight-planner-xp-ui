// models/genericModels.ts

// --- Enums ---
export enum Direction {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
}

export enum Currency {
  EUR = "EUR",
}

export enum DistanceUnit {
  KM = "KM",
  MI = "MI",
}

// --- Core Models ---
export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Distance {
  value: number;
  unit: DistanceUnit;
}

/**
 * Parse a plain object into LatLng
 */
export function parseLatLng(obj: any): LatLng {
  return {
    latitude: Number(obj.latitude),
    longitude: Number(obj.longitude),
  };
}

/**
 * Parse a plain object into Distance
 */
export function parseDistance(obj: any): Distance {
  return {
    value: Number(obj.value),
    unit: (obj.unit as DistanceUnit) ?? DistanceUnit.KM,
  };
}
