import { Dropdown } from "react-bootstrap";
import type { Tag } from "../datamodels/Tag";
import React, { use, useState } from "react";
import { getTags } from "../logic/queryBackend";
import { useQuery } from "@tanstack/react-query";

export function RouteTagsDisplay({ tags }: Readonly<{ tags: Tag[] }>) {
  if (!tags || tags.length === 0) return <></>;

  return (
    <div className="bs-dark p-2 mb-3 h-stack gap-2">
      {tags.map((tag) => (
        <div key={tag.id} className="d-flex flex-row">
          <i className="bi bi-tag-fill me-1"></i>
          {tag.name}
        </div>
      ))}
    </div>
  );
}

export function RouteTagsDropdown({
  currentTags,
  setRouteTags,
}: Readonly<{
  currentTags: Tag[];
  setRouteTags: (tags: Tag[]) => void;
}>) {
  // This holds *all available* tags from backend
  const { data, isLoading, error } = useQuery<Tag[], Error>({
    queryKey: ["allTags"],
    queryFn: getTags,
  });

  if (isLoading) return <div>Loading tags...</div>;
  if (error)
    return (
      <div className="text-danger">Error loading tags: {error.message}</div>
    );

  let tagsList: React.ReactNode = <></>;

  if (data) {
    tagsList = data.map((tag) => {
      if (currentTags.some((t) => t.id === tag.id)) {
        return null; // Skip tags already assigned to the route
      }

      return (
        <Dropdown.Item
          key={tag.id}
          onClick={() => {
            if (!currentTags.some((t) => t.id === tag.id)) {
              setRouteTags([...currentTags, tag]);
            }
          }}
        >
          <div className="d-flex flex-row">
            <i className="bi bi-tag-fill me-1"></i>
            {tag.name}
          </div>
        </Dropdown.Item>
      );
    });
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Add a tag
      </Dropdown.Toggle>

      <Dropdown.Menu>{tagsList}</Dropdown.Menu>
    </Dropdown>
  );
}
