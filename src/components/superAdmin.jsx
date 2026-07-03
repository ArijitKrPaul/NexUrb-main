import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AdminCard from "./AdminCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const columns = [
  { field: "displayId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 150, editable: false },
];

const columns_dept = [
  { field: "displayId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Department Name", width: 150, editable: true },
  { field: "state", headerName: "State", width: 150, editable: false },
  { field: "city", headerName: "City", width: 150, editable: false },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminComponent() {
  const [rows, setRows] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [dept, setDept] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => setOpen((prev) => !prev);
  const handleChange = (event, newValue) => setValue(newValue);

  React.useEffect(
    function () {
      const fetchData = async () => {
        try {
          const q = await axios.get("http://localhost:5000/deptRegister");
          const r = await axios.get("http://localhost:5000/user");
          const d = await axios.get("http://localhost:5000/deptAccept");

          setDept(
            d.data.map((elem, index) => ({
              ...elem,
              id: elem.dept_id,
              displayId: index + 1,
            })),
          );
          setRows(
            r.data.map((user, index) => ({
              ...user,
              id: user.user_id,
              displayId: index + 1,
            })),
          );
          setData(q.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    },
    [count],
  );

  const handleAccept = async (id, name, state, city, location, user_id) => {
    try {
      await axios.delete(`http://localhost:5000/deptRegister/${id}`);
      await axios.post("http://localhost:5000/deptAccept", {
        name,
        state,
        city,
        location,
        id,
      });
      await axios.put("http://localhost:5000/addDeptId", { id, user_id });
      setCount(count + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deptRegister/${id}`);
      setCount(count + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    localStorage.removeItem("user");
    navigate("/login");
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  function handleClickAway() {
    setOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#FCFBFE]">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-[#E4DFEE] bg-white">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[2.5px] text-[#6b46a6] mb-0.5">
            ADMIN CONSOLE
          </p>
          <p className="font-serif text-xl font-semibold text-[#211C2B] leading-none">
            Nex<span className="text-[#6b46a6]">Urb</span>
          </p>
        </div>

        <div className="relative">
          <button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open}
            aria-haspopup="true"
            onClick={handleToggle}
            className="flex items-center justify-center h-9 w-9 rounded-full border border-[#E4DFEE] bg-[#F8F6FC] text-[#6b46a6] transition hover:bg-[#F1EAFB] hover:border-[#6b46a6]"
          >
            <PersonIcon fontSize="small" />
          </button>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-end" ? "right top" : "right bottom",
                }}
              >
                <Paper
                  sx={{
                    mt: 1,
                    border: "1px solid #E4DFEE",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px -18px rgba(33,28,43,0.35)",
                    minWidth: 160,
                  }}
                >
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontSize: "14px",
                          gap: 1,
                          color: "#211C2B",
                        }}
                      >
                        <LogoutIcon
                          fontSize="small"
                          sx={{ color: "#7A7188" }}
                        />
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <Box
        sx={{
          display: "flex",
          m: { xs: 2, sm: 4 },
          borderRadius: "16px",
          border: "1px solid #E4DFEE",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 10px 30px -18px rgba(33,28,43,0.25)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ borderRight: "1px solid #E4DFEE" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Admin sections"
            sx={{
              minWidth: 220,
              "& .MuiTab-root": {
                alignItems: "flex-start",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#7A7188",
                px: 3,
                py: 2,
              },
              "& .Mui-selected": { color: "#6b46a6 !important" },
              "& .MuiTabs-indicator": { backgroundColor: "#6b46a6" },
            }}
          >
            <Tab label="Registered Users" {...a11yProps(0)} />
            <Tab label="Registered Departments" {...a11yProps(1)} />
            <Tab label="Notifications" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value={value} index={0}>
            <Typography
              sx={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#211C2B",
                mb: 3,
              }}
            >
              Manage users
            </Typography>
            <Box sx={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#F8F6FC",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "#6b46a6",
                    textTransform: "uppercase",
                  },
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography
              sx={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#211C2B",
                mb: 3,
              }}
            >
              Manage departments
            </Typography>
            <Box sx={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={dept}
                columns={columns_dept}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#F8F6FC",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "#6b46a6",
                    textTransform: "uppercase",
                  },
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography
              sx={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#211C2B",
                mb: 3,
              }}
            >
              Notifications
            </Typography>
            {data.length === 0 ? (
              <p className="text-sm text-[#7A7188]">
                No pending department requests right now.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {data.map((elem) => (
                  <AdminCard
                    key={elem.id ?? elem.dept_id}
                    e={elem}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))}
              </div>
            )}
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
