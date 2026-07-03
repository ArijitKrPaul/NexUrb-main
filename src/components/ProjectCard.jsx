import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBuilding,
  faCalendarDays,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const statusStyles = {
  ongoing: { bg: "#FFF3CD", color: "#8A6100", label: "Ongoing" },
  completed: { bg: "#D1F2E1", color: "#0F6E3D", label: "Completed" },
};

const ProjectCard = (props) => {
  const { data, onStatusChange } = props;
  const status = (data.status || "ongoing").toLowerCase();
  const style = statusStyles[status] || statusStyles.ongoing;

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const handleMarkCompleted = async (e) => {
    e.stopPropagation();
    try {
      await axios.patch(
        `http://localhost:5000/project/${data.project_id}/status`,
        {
          status: "completed",
        },
      );
      console.log("calling onStatusChange with:", data.project_id, "completed");
      if (onStatusChange) onStatusChange(data.project_id, "completed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-105 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 p-5 border border-gray-100">
      {/* Header: title + status chip */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h1 className="text-black font-bold text-2xl leading-tight">
          {data.Name}
        </h1>
        <Chip
          label={style.label}
          size="small"
          sx={{
            backgroundColor: style.bg,
            color: style.color,
            fontWeight: 600,
          }}
        />
      </div>

      {/* Type + department */}
      <div className="flex items-center gap-2 mb-3 text-gray-600">
        <FontAwesomeIcon icon={faBuilding} size="sm" />
        <p className="text-sm font-medium">
          {data.type} &middot; {data.dept_name}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {data.description}
      </p>

      {/* Location + date row */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faLocationDot} size="sm" />
          <span>
            {data.city}, {data.state}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCalendarDays} size="sm" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Footer action */}
      {status === "ongoing" && (
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<FontAwesomeIcon icon={faListCheck} />}
          onClick={handleMarkCompleted}
          sx={{
            borderColor: "#6b46a6",
            color: "#6b46a6",
            textTransform: "none",
            "&:hover": { borderColor: "#553c8f", backgroundColor: "#f5f0fa" },
          }}
        >
          Mark as Completed
        </Button>
      )}
    </div>
  );
};

export default ProjectCard;
