import { Dropdown } from "react-bootstrap";
import type { Tag } from "../datamodels/Tag";
import React from "react";
import { getTags } from "../logic/queryBackend";
import { useQuery } from "@tanstack/react-query";

export function RouteTagsDisplay({
  tags,
  setTags,
  direction = "vertical",
}: Readonly<{
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  direction?: "horizontal" | "vertical";
}>) {
  if (!tags || tags.length === 0) return <></>;

  const stackType = direction === "horizontal" ? "h-stack" : "v-stack";

  const removeTag = (tagToRemove: Tag) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagToRemove.id);
    setTags(updatedTags);
  };

  return (
    <div className={`bs-dark p-2 mb-3 ${stackType} gap-2`}>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="d-flex flex-row align-items-center badge bg-light py-0 text-dark"
        >
          <i className="bi bi-tag-fill me-1"></i>
          {tag.name}
          <button
            type="button"
            className="btn ms-2"
            aria-label="Remove tag"
            onClick={() => removeTag(tag)}
          >
            <i className="bi bi-x text-danger"></i>
          </button>
        </span>
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
    queryKey: ["getTags"],
    queryFn: getTags,
  });

  if (isLoading) return <div>Loading tags...</div>;
  if (error)
    return (
      <div className="text-danger">Error loading tags: {error.message}</div>
    );

  let tagsList: React.ReactNode = <></>;

  if (data?.length && data?.length > 0) {
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
  } else {
    tagsList = [
      <Dropdown.Item key={0} disabled={true}>
        No tags just yet!
      </Dropdown.Item>,
    ];
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Add a tag
      </Dropdown.Toggle>

      <Dropdown.Menu>{tagsList}</Dropdown.Menu>
    </Dropdown>
  );
}
