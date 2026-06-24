import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const AdminCard = (props) => {
  const { e } = props;

  return (
    <div className="w-[25vw] h-[30vh] bg-white border border-gray-300 rounded-xl overflow-hidden flex flex-col">
      {/* Info section */}
      <div className="p-4 flex flex-col gap-1.5">
        <p className="text-lg font-bold text-gray-800">{e.dept_name}</p>
        <p className="text-sm text-gray-600">
          <b>State:</b> {e.state}
        </p>
        <p className="text-sm text-gray-600">
          <b>City:</b> {e.city}
        </p>
        <p className="text-sm text-gray-600">
          <b>Location:</b> {e.location}
        </p>

        {/* PDF download link */}
        <a
          href={`http://localhost:5000/documents/${e.stored_name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mt-2 text-[#6065f0] hover:underline text-sm font-medium"
        >
          <PictureAsPdfIcon sx={{ fontSize: 20 }} />
          {e.original_name || "View Document"}
        </a>
      </div>

      {/* Action buttons - separate footer tile */}
      <div className="bg-[#f8f9fa] border-t border-gray-300 flex justify-center gap-5 p-3 mt-auto">
        <button
          className="bg-green-500 text-white px-5 py-2 rounded-xl active:scale-95 hover:bg-green-600 transition"
          onClick={() =>
            props.onAccept(
              e.id,
              e.dept_name,
              e.state,
              e.city,
              e.location,
              e.user_id,
            )
          }
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-5 py-2 rounded-xl active:scale-95 hover:bg-red-600 transition"
          onClick={() => props.onDecline(e.id)}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
