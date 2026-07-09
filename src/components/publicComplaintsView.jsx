import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

export default function MyComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.user_id;

  React.useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getImages", {
          params: { id: user_id },
        });
        setComplaints(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    // Locked to viewport height, no page-level scroll
    <div className="bg-[#F8F9FA] h-screen w-full p-5 overflow-hidden">
      <div className="bg-[#F8F9FA] h-full w-full px-45 flex flex-col overflow-hidden">
        {/* Header — fixed, does not scroll */}
        <div className="border-b border-black pb-8 pt-10 flex justify-between items-start shrink-0">
          <div>
            <p className="text-left text-5xl font-extrabold mb-8 font-sans">
              NEXURB
            </p>
            <p className="text-left text-6xl font-extrabold font-sans">
              MY COMPLAINTS
            </p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-black font-medium active:scale-95"
          >
            <ArrowLeftIcon size={24} weight="bold" />
            Back
          </button>
        </div>

        {/* Only this section scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto py-8 pr-2">
          {loading ? (
            <p className="font-medium text-xl text-center mt-10">
              Loading complaints...
            </p>
          ) : complaints.length === 0 ? (
            <p className="font-bold text-2xl text-center mt-10">
              No complaints lodged till now
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6 auto-rows-fr pb-6">
              {complaints.map((complaint) => (
                <Card
                  key={complaint.c_id}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "none",
                    border: "1px solid #eee",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardHeader
                    title={
                      <Chip
                        label={complaint.status || "pending"}
                        color={
                          complaint.status === "solved" ? "success" : "warning"
                        }
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    }
                    sx={{ pb: 0 }}
                  />

                  <CardMedia
                    component="img"
                    sx={{
                      height: 180,
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    image={`http://localhost:5000/images/${complaint.stored_name}`}
                    alt={complaint.original_name}
                    className="px-2"
                  />

                  <CardContent sx={{ maxHeight: 160, overflowY: "auto" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {complaint.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      {complaint.city}, {complaint.state}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      📍 {complaint.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {complaint.email}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {complaint.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
