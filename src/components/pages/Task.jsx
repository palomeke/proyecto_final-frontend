import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import { Link } from "react-router-dom";

const Task = ({ props, onDelete }) => {
  const [badgecolor, setBadgecolor] = useState();
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (props.status === "Pending") {
      setBadgecolor("blue");
    } else if (props.status === "Running") {
      setBadgecolor("yellow");
    } else if (props.status === "Completed") {
      setBadgecolor("green");
      setCanDelete(true); // Solo se puede eliminar si está completada
    } else if (props.status === "Failed") {
      setBadgecolor("red");
    }
  }, [props.status]);

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    if (!canDelete) {
      alert("Only completed tasks can be deleted");
      return;
    }
    await onDelete(props._id);
  };

  return (
    <div className="border p-3 rounded-md mb-5">
      <h3 className="text-lg font-semibold">
        <span className="me-2">{props.title}</span>
        <Badge props={{ color: badgecolor, text: props.status }} />
      </h3>
      <p className="line-clamp-2 mb-2">{props.description}</p>
      <p className="text-sm text-gray-500 mb-3">
        Due: {formatDate(props.dueDate)}
      </p>
      <div className="flex gap-5 items-center">
        <Link
          to={`/show-task/${props._id}`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center p-2"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <button
          onClick={handleDelete}
          className={`text-white font-medium rounded-lg text-sm text-center inline-flex items-center p-2 ${
            canDelete
              ? "bg-red-700 hover:bg-red-800 focus:ring-red-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!canDelete}
          title={
            canDelete ? "Delete task" : "Only completed tasks can be deleted"
          }
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;
