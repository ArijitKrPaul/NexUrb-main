import { Box, Toolbar, Typography } from "@mui/material";
import { StepsIcon } from "@phosphor-icons/react";
import React from "react";
import DeptRegForm from "./DeptRegForm";

const DeptReg = () => {
  return (
    <div className="bg-[#f8f9fa] h-screen">
      <Toolbar
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
            DEPARTMENT REGISTRY
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
      <DeptRegForm />
    </div>
  );
};

export default DeptReg;
