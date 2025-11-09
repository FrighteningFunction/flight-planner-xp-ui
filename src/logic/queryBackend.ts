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

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(route),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  let route_id = (await res.json())["route_id"];
  return route_id;
}

export async function addTag(name: string): Promise<boolean> {
  const res = await fetch(`${BACKEND_URL}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name}),
  });

  if (!res.ok) {
    logger.debug(`Failed to add tag with name ${name}`);
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return true;
}

export async function updateTag(id: number, name: string): Promise<boolean> {
  const res = await fetch(`${BACKEND_URL}/tags/asshole`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name }),
  });

  if (!res.ok) {
    logger.debug(`Failed to update tag with id ${id}`);
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return true;
}

export async function deleteTag(id: number): Promise<boolean> {
  const res = await fetch(`${BACKEND_URL}/tags/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    logger.debug(`Failed to delete tag with id ${id}`);
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return true;
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
