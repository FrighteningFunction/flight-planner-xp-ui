import type { Tag } from "../datamodels/Tag";
import type { GenericRoute } from "../datamodels/trip";
import { BACKEND_URL } from "../env";
import { logger } from "../logging/logger";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined in environment variables.");
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function saveRoute(route: GenericRoute): Promise<number> {
  let url = `${BACKEND_URL}/save-route`;

  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(route) });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  let route_id = (await res.json())["route_id"];
  return route_id;
}

export async function saveTag(name: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
}

export async function getTags(): Promise<Tag[]> {
  let tags: Tag[] = [];
  await apiFetch<Tag[]>(`${BACKEND_URL}/tags`)
    .then((fetchedTags) => {
      tags = fetchedTags;
    })
    .catch((error) => {
      logger.error("Error fetching tags:", error);
    });
  return tags;
}
