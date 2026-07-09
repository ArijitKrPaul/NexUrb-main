import "../css/project.css";
import * as React from "react";
import axios from "axios";
import {
  Button,
  Box,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

import Typography from "@mui/material/Typography";
import ProjectCard from "./ProjectCard";
import AllProjectCard from "./AllprojectCard";

export default function AllProjectComponent() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [dataArr, setDataArr] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("all");

  const handleSubmit = async (e, statusOverride) => {
    e.preventDefault();
    const effectiveStatus =
      statusOverride !== undefined ? statusOverride : statusFilter;
    console.log(state, city, effectiveStatus);

    try {
      const res = await axios.get("http://localhost:5000/project", {
        params: {
          state: state,
          city: city,
          status: effectiveStatus,
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
      </Toolbar>

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
            return <AllProjectCard key={elem.project_id} data={elem} />;
          })}
        </Box>
      </div>
    </div>
  );
}
