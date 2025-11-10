import React from "react";
import type { Tag } from "../datamodels/Tag";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addTag, deleteTag, getTags, updateTag } from "../logic/queryBackend";
import {toastContext } from "./FlightPlannerToast";

export function TagEditorPanel() {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTagName, setNewTagName] = React.useState("");
  const { isLoading, error, data } = useQuery<Tag[]>({
    queryKey: ["getTags"],
    queryFn: getTags,
  });

  const { addToast } = React.useContext(toastContext);

  const queryClient = useQueryClient();

  const toggleAddTagEditor = () => {
    setIsAdding(true);
  };

  const addNewTag = async () => {
    let success = false;

    try {
      success = await addTag(newTagName);
    } catch (error) {
      addToast("danger", `Error adding tag: ${(error as Error).message}`);
    }
    if (success) {
      addToast("success", "Tag added successfully");
    }
    queryClient.invalidateQueries({ queryKey: ["getTags"] });
    setIsAdding(false);
  };

  const addTagButton = (
    <button
      className="btn btn-primary mb-3"
      type="button"
      onClick={toggleAddTagEditor}
    >
      <i className="bi bi-plus-lg me-1"></i> Add Tag
    </button>
  );

  const addTagForm = (
    <form
      onSubmit={async (e) => {
        e.preventDefault(); // stop browser reload
        await addNewTag();
      }}
      className="mb-3"
    >
      <input
        type="text"
        className="form-control w-50"
        placeholder="New tag name"
        onChange={(e) => setNewTagName(e.target.value)}
      />
      <button className="btn btn-primary mt-2" type="submit">
        Add Tag
      </button>
    </form>
  );

  let tagsList: React.ReactNode = <></>;

  if (data && data.length > 0) {
    tagsList = (
      <ul className="list-group my-1 w-50">
        {data?.map((tag) => (
          <TagDisplay key={tag.id} tag={tag} />
        ))}
      </ul>
    );
  }

  let content: React.ReactNode;

  let addTagContent: React.ReactNode;
  if (isAdding) {
    addTagContent = addTagForm;
  } else {
    addTagContent = addTagButton;
  }

  if (isLoading) {
    content = <div>Loading tags...</div>;
  } else if (error) {
    content = (
      <div className="alert-danger">Error loading tags : {error.message} </div>
    );
  } else {
    content = (
      <>
        {tagsList}
        {addTagContent}
      </>
    );
  }
  return content;
}

function TagDisplay({ tag }: Readonly<{ tag: Tag }>) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(tag.name);

  const { addToast } = React.useContext(toastContext);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    let success = false;
    try {
      success = await updateTag(tag.id, editedName);
    } catch (error) {
      addToast("danger", `Error updating tag: ${(error as Error).message}`);
    }
    setIsEditing(false);
    if (success) {
      addToast("success", "Tag updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getTags"] });
      queryClient.invalidateQueries({ queryKey: ["getRoutes"] });
    }
  };

  const handleDelete = async () => {
    let success = false;
    try {
      success = await deleteTag(tag.id);
    } catch (error) {
      addToast("danger", `Error deleting tag: ${(error as Error).message}`);
      return;
    }
    if (success) {
      addToast("success", "Tag deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getTags"] });
      queryClient.invalidateQueries({ queryKey: ["getRoutes"] });
    }
  };

  const nameDisplay = isEditing ? (
    <input
      type="text"
      value={editedName}
      placeholder="New tag name"
      onChange={(e) => setEditedName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // stop form submission
          handleSave();
        }
      }}
      className="form-control"
    />
  ) : (
    tag.name
  );

  return (
    <li
      key={tag.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <div className="d-flex flex-row gap-1">
        <i className="bi bi-tag-fill me-2"></i>
        {nameDisplay}
      </div>
      <div className="d-flex flex-row gap-1">
        <button
          className="btn btn-sm btn-outline-primary me-2"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          <i className="bi bi-pencil-fill me-1"></i>
          Edit
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          type="button"
          onClick={handleDelete}
        >
          <i className="bi bi-trash-fill me-1"></i>
          Delete
        </button>
      </div>
    </li>
  );
}
