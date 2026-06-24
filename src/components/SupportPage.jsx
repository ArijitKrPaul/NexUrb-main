import React from "react";
import axios from "axios";
import { StepsIcon } from "@phosphor-icons/react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Alert } from "@mui/material";

export default function SupportPageComponenet() {
  const [complaints, setComplaints] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [stateFilter, setStateFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [error, setError] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeComplaint, setActiveComplaint] = React.useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/complaints", {
        params: {
          state: stateFilter || undefined,
          city: cityFilter || undefined,
        },
      });
      setComplaints(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // refetch whenever filters change
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      fetchComplaints();
    }, 400); // debounce so it doesn't fire on every keystroke

    return () => clearTimeout(timeout);
  }, [stateFilter, cityFilter]);

  const handleMenuOpen = (e, complaint) => {
    const role = JSON.parse(localStorage.getItem("user")).role;
    if (role === "Support") {
      setAnchorEl(e.currentTarget);
      setActiveComplaint(complaint);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveComplaint(null);
  };

  const updateStatus = async (newStatus) => {
    if (!activeComplaint) return;

    try {
      await axios.patch(
        `http://localhost:5000/complaints/${activeComplaint.c_id}/status`,
        { status: newStatus },
      );

      setComplaints((prev) =>
        prev.map((c) =>
          c.c_id === activeComplaint.c_id ? { ...c, status: newStatus } : c,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <div>
      <div className="bg-white flex h-12 py-1.5 text-2xl px-5 border-b border-gray-300 font-bold">
        <StepsIcon size={34} color="#6065f0" weight="fill" />
        NexUrb
      </div>
      {error && <Alert severity="warning">Not Suitable Permission</Alert>}

      <div className="bg-white h-[85vh] w-[90vw] m-auto mt-10 p-5 flex flex-col">
        {/* Filters - stay fixed at top */}
        <div className="flex gap-4 mb-5 shrink-0">
          <TextField
            label="Filter by State"
            size="small"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          />
          <TextField
            label="Filter by City"
            size="small"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading complaints...</p>
        ) : (
          <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-4 p-2 content-start">
            {complaints.map((complaint) => (
              <Card
                key={complaint.c_id}
                sx={{
                  maxWidth: 345,
                  width: 345,
                  backgroundColor: "white",
                  height: 425,
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
                      sx={{ width: 100, fontWeight: "bold" }}
                    />
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={(e) => handleMenuOpen(e, complaint)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                />

                <CardMedia
                  component="img"
                  sx={{ height: 200, width: 345, objectFit: "cover" }}
                  image={`http://localhost:5000/images/${complaint.stored_name}`}
                  alt={complaint.original_name}
                  className="p-2"
                />

                <CardContent sx={{ maxHeight: 150, overflowY: "auto" }}>
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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {complaint.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            {complaints.length === 0 && (
              <p className="text-gray-500">No complaints match this filter.</p>
            )}
          </div>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => updateStatus("solved")}>
          Mark as Solved
        </MenuItem>
        <MenuItem onClick={() => updateStatus("pending")}>
          Mark as Pending
        </MenuItem>
      </Menu>
    </div>
  );
}
