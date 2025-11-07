import type { Tag } from "../datamodels/Tag";
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

export async function saveLastRoute(tagids?: string[]): Promise<void> {
  let url = `${BACKEND_URL}/save-last-route`;

  if (tagids && tagids.length > 0) {
    const params = new URLSearchParams();
    tagids.forEach((tagid) => params.append("tagids", tagid));
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
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
