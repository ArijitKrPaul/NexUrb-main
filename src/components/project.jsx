import "../css/project.css";
import * as React from "react";
import axios from "axios";
import {
  Button,
  Stack,
  Box,
  Toolbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Backdrop from "@mui/material/Backdrop";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
library.add(fas, far, fab);

import Typography from "@mui/material/Typography";
import ProjectCard from "./ProjectCard";

// Shared styling for form fields in the Add/Update Project cards
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "'IBM Plex Sans', sans-serif",
    backgroundColor: "#FBFAFD",
    "& fieldset": { borderColor: "#E4DFEE" },
    "&:hover fieldset": { borderColor: "#C9BEDD" },
    "&.Mui-focused fieldset": { borderColor: "#6b46a6", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'IBM Plex Sans', sans-serif",
    color: "#7A7188",
    "&.Mui-focused": { color: "#6b46a6" },
  },
};

// Small uppercase section eyebrow used inside the Add/Update Project cards
const SectionLabel = ({ children }) => (
  <Typography
    sx={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "1.8px",
      color: "#6b46a6",
      textAlign: "left",
      mb: 1.25,
      "&::before": { content: '"— "' },
    }}
  >
    {children.toUpperCase()}
  </Typography>
);

export default function ProjectComponent() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [dataArr, setDataArr] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [permission, setPermission] = React.useState(false);

  // Add Project modal state
  const [open, setOpen] = React.useState(false);
  const [dept, setDept] = React.useState("");
  const [project, setProject] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [addState, setAddState] = React.useState("");
  const [name, setName] = React.useState("");

  // Update Project modal state
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [updateId, setUpdateId] = React.useState(null);
  const [updateName, setUpdateName] = React.useState("");
  const [updateType, setUpdateType] = React.useState("");
  const [updateState, setUpdateState] = React.useState("");
  const [updateCity, setUpdateCity] = React.useState("");
  const [updateDesc, setUpdateDesc] = React.useState("");

  const handleSubmit = async (e, statusOverride) => {
    e.preventDefault();

    const q = JSON.parse(localStorage.getItem("user"));
    const id = q.dept_id;

    const effectiveStatus =
      statusOverride !== undefined ? statusOverride : statusFilter;
    console.log(state, city, effectiveStatus);

    try {
      const res = await axios.get("http://localhost:5000/deptproject", {
        params: {
          state: state,
          city: city,
          status: effectiveStatus,
          id: id,
        },
      });
      console.log(res);
      setDataArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Let people hit Enter in either field to trigger the search
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleStatusFilterChange = (e, newValue) => {
    if (newValue === null) return; // prevent deselecting all options
    setStatusFilter(newValue);
    handleSubmit({ preventDefault: () => {} }, newValue);
  };

  const handleStatusChange = (projectId, newStatus) => {
    setDataArr((prev) =>
      prev.map((p) =>
        p.project_id === projectId ? { ...p, status: newStatus } : p,
      ),
    );
  };

  // --- Add Project handlers ---
  const handleForm = async () => {
    const q = JSON.parse(localStorage.getItem("user"));
    const dept1 = q.dept_id;

    try {
      await axios.post("http://localhost:5000/project", {
        name: name,
        type: project,
        id: dept1,
        description: desc,
        state: addState,
        city: location,
      });
    } catch (error) {
      console.log(error);
    }

    setDept("");
    setProject("");
    setLocation("");
    setAddState("");
    setDesc("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "Project Manager") {
      setOpen(true);
    } else {
      setPermission(true);
      setTimeout(() => {
        setPermission(false);
      }, 2000);
    }
  };

  // --- Update Project handlers ---
  const handleOpenUpdate = (projectData) => {
    setUpdateId(projectData.project_id);
    setUpdateName(projectData.Name || "");
    setUpdateType(projectData.type || "");
    setUpdateState(projectData.state || "");
    setUpdateCity(projectData.city || "");
    setUpdateDesc(projectData.description || "");
    setUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    setUpdateOpen(false);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.patch(`http://localhost:5000/project/${updateId}`, {
        name: updateName,
        type: updateType,
        state: updateState,
        city: updateCity,
        description: updateDesc,
      });

      setDataArr((prev) =>
        prev.map((p) =>
          p.project_id === updateId
            ? {
                ...p,
                Name: updateName,
                type: updateType,
                state: updateState,
                city: updateCity,
                description: updateDesc,
              }
            : p,
        ),
      );
    } catch (error) {
      console.log(error);
    }

    setUpdateOpen(false);
  };

  return (
    <div>
      <Toolbar
        id="ProjectNavbar"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          py: 2,
          borderBottom: "1px solid #E4DFEE",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              color: "#6b46a6",
              mb: "2px",
            }}
          >
            MUNICIPAL PROJECT REGISTRY
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "26px",
              fontWeight: 600,
              color: "#211C2B",
              lineHeight: 1,
            }}
          >
            Nex<span style={{ color: "#6b46a6" }}>Urb</span>
          </Typography>
        </Box>

        <Tooltip title="Add new project">
          <IconButton
            id="addButton"
            onClick={handleOpen}
            sx={{
              border: "1.5px solid #6b46a6",
              borderRadius: "10px",
              px: 2,
              py: 0.75,
              color: "#6b46a6",
              gap: 1,
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#F1EAFB" },
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} size="sm" />
            <Typography
              component="span"
              sx={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              New Project
            </Typography>
          </IconButton>
        </Tooltip>
      </Toolbar>

      <div className="flex justify-center mt-2.5">
        {permission && (
          <Alert severity="warning">Not Suitable Permission</Alert>
        )}
      </div>

      <div class="projectcontainer">
        <div class="search-area">
          <TextField
            label="State"
            variant="filled"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="e.g. West Bengal"
          />
          <TextField
            label="City"
            variant="filled"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="e.g. Kolkata"
          />
        </div>

        <Box display="flex" justifyContent="center" mt={1.5} mb={0.5}>
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={handleStatusFilterChange}
            size="small"
            sx={{
              backgroundColor: "#FBFAFD",
              border: "1px solid #E4DFEE",
              borderRadius: "10px",
              p: "3px",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "8px !important",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "#7A7188",
                px: 2,
                "&.Mui-selected": {
                  backgroundColor: "#6b46a6",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#553c8f" },
                },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="ongoing">Ongoing</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Button id="search-button" onClick={handleSubmit}>
          Search
        </Button>

        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "13px",
            color: "#7A7188",
            mt: 1,
            mb: 1,
          }}
        >
          {dataArr.length} {dataArr.length === 1 ? "project" : "projects"} found
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            gap: "20px",
            maxHeight: "75vh",
            overflowY: "auto",
            pb: 2,
            pr: 0.5,
          }}
        >
          {dataArr.map(function (elem) {
            return (
              <ProjectCard
                key={elem.project_id}
                data={elem}
                onStatusChange={handleStatusChange}
                onUpdate={handleOpenUpdate}
              />
            );
          })}
        </Box>

        {/* Add Project modal */}
        <Backdrop
          sx={(theme) => ({
            color: "black",
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "rgba(33, 28, 43, 0.55)",
            backdropFilter: "blur(3px)",
          })}
          open={open}
        >
          <Box
            sx={{
              width: 480,
              maxWidth: "92vw",
              maxHeight: "88vh",
              overflowY: "auto",
              borderRadius: "20px",
              backgroundColor: "#FFFFFF",
              backgroundImage: `
                linear-gradient(rgba(107,70,166,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(107,70,166,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "22px 22px",
              boxShadow:
                "0 24px 60px -16px rgba(33,28,43,0.45), 0 0 0 1px rgba(228,223,238,1)",
              p: { xs: 3, sm: 4.5 },
              fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              mb={2}
            >
              <Box textAlign="left">
                <Typography
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2.5px",
                    color: "#6b46a6",
                    mb: 0.5,
                  }}
                >
                  PROJECT INTAKE FORM
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#211C2B",
                    lineHeight: 1.15,
                  }}
                >
                  Add New Project
                </Typography>
              </Box>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="lg"
                className="xMark"
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  color: "#B7ADC9",
                  marginTop: "4px",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6b46a6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#B7ADC9")}
              />
            </Box>

            {/* double rule under header */}
            <Box mb={3}>
              <Box
                sx={{ height: "2px", backgroundColor: "#211C2B", mb: "3px" }}
              />
              <Box sx={{ height: "1px", backgroundColor: "#E4DFEE" }} />
            </Box>

            <SectionLabel>Project Identity</SectionLabel>
            <Stack gap={2} mb={3}>
              <TextField
                label="Project Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                sx={fieldSx}
              />
              <Box display="flex" gap={2}>
                <TextField
                  label="Project Type"
                  variant="outlined"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  required
                  fullWidth
                  sx={fieldSx}
                />
              </Box>
            </Stack>

            <SectionLabel>Location &amp; Scope</SectionLabel>
            <Stack gap={2} mb={3.5}>
              <Box display="flex" gap={2}>
                <TextField
                  label="State"
                  variant="outlined"
                  value={addState}
                  onChange={(e) => setAddState(e.target.value)}
                  required
                  fullWidth
                  sx={fieldSx}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  fullWidth
                  sx={fieldSx}
                />
              </Box>
              <TextField
                label="Project Description"
                multiline
                minRows={3}
                maxRows={5}
                variant="outlined"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                fullWidth
                sx={fieldSx}
              />
            </Stack>

            <Button
              variant="contained"
              fullWidth
              onClick={handleForm}
              sx={{
                backgroundColor: "#6b46a6",
                color: "#fff",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                py: 1.4,
                borderRadius: "10px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#553c8f",
                  boxShadow: "0 8px 20px -8px rgba(107,70,166,0.6)",
                },
              }}
            >
              File Project
            </Button>
          </Box>
        </Backdrop>

        {/* Update Project modal */}
        <Backdrop
          sx={(theme) => ({
            color: "black",
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "rgba(33, 28, 43, 0.55)",
            backdropFilter: "blur(3px)",
          })}
          open={updateOpen}
        >
          <Box
            sx={{
              width: 480,
              maxWidth: "92vw",
              maxHeight: "88vh",
              overflowY: "auto",
              borderRadius: "20px",
              backgroundColor: "#FFFFFF",
              backgroundImage: `
                linear-gradient(rgba(107,70,166,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(107,70,166,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "22px 22px",
              boxShadow:
                "0 24px 60px -16px rgba(33,28,43,0.45), 0 0 0 1px rgba(228,223,238,1)",
              p: { xs: 3, sm: 4.5 },
              fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              mb={2}
            >
              <Box textAlign="left">
                <Typography
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2.5px",
                    color: "#6b46a6",
                    mb: 0.5,
                  }}
                >
                  PROJECT UPDATE FORM
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#211C2B",
                    lineHeight: 1.15,
                  }}
                >
                  Update Project
                </Typography>
              </Box>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="lg"
                className="xMark"
                onClick={handleCloseUpdate}
                style={{
                  cursor: "pointer",
                  color: "#B7ADC9",
                  marginTop: "4px",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6b46a6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#B7ADC9")}
              />
            </Box>

            {/* double rule under header */}
            <Box mb={3}>
              <Box
                sx={{ height: "2px", backgroundColor: "#211C2B", mb: "3px" }}
              />
              <Box sx={{ height: "1px", backgroundColor: "#E4DFEE" }} />
            </Box>

            <SectionLabel>Project Identity</SectionLabel>
            <Stack gap={2} mb={3}>
              <TextField
                label="Project Name"
                variant="outlined"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                required
                fullWidth
                sx={fieldSx}
              />
              <Box display="flex" gap={2}>
                <TextField
                  label="Project Type"
                  variant="outlined"
                  value={updateType}
                  onChange={(e) => setUpdateType(e.target.value)}
                  required
                  fullWidth
                  sx={fieldSx}
                />
              </Box>
            </Stack>

            <SectionLabel>Location &amp; Scope</SectionLabel>
            <Stack gap={2} mb={3.5}>
              <Box display="flex" gap={2}>
                <TextField
                  label="State"
                  variant="outlined"
                  value={updateState}
                  onChange={(e) => setUpdateState(e.target.value)}
                  required
                  fullWidth
                  sx={fieldSx}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  value={updateCity}
                  onChange={(e) => setUpdateCity(e.target.value)}
                  required
                  fullWidth
                  sx={fieldSx}
                />
              </Box>
              <TextField
                label="Project Description"
                multiline
                minRows={3}
                maxRows={5}
                variant="outlined"
                value={updateDesc}
                onChange={(e) => setUpdateDesc(e.target.value)}
                required
                fullWidth
                sx={fieldSx}
              />
            </Stack>

            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdateSubmit}
              sx={{
                backgroundColor: "#6b46a6",
                color: "#fff",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                py: 1.4,
                borderRadius: "10px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#553c8f",
                  boxShadow: "0 8px 20px -8px rgba(107,70,166,0.6)",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Backdrop>
      </div>
    </div>
  );
}
