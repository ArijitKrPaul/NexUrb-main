import "../css/super.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AdminCard from "./AdminCard";
import axios from "axios";

const columns = [
  { field: "displayId", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  // {
  //   field: "Phone",
  //   headerName: "Phone Number",
  //   type: "number",
  //   width: 150,
  //   editable: false,
  //   textAlign: "center",
  // },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false,
  },
];
const columns_dept = [
  { field: "displayId", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Department Name",
    width: 150,
    editable: true,
  },
  {
    field: "state",
    headerName: "State",

    width: 150,
    editable: false,
    textAlign: "center",
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
    editable: false,
  },
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = React.useState([]);

  React.useEffect(
    function () {
      const fetchData = async () => {
        try {
          const q = await axios.get("http://localhost:5000/deptRegister");
          const r = await axios.get("http://localhost:5000/user");
          const d = await axios.get("http://localhost:5000/deptAccept");
          const withId = d.data.map((elem, index) => ({
            ...elem,
            id: elem.dept_id,
            displayId: index + 1,
          }));
          console.log(withId);
          const withDisplayId = r.data.map((user, index) => ({
            ...user,
            id: user.user_id,
            displayId: index + 1,
          }));

          setDept(withId);
          setRows(withDisplayId);
          console.log(withDisplayId);
          console.log(q.data);
          setData(q.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    },
    [count],
  );

  const handleAccept = async (id, name, state, city, location) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/deptRegister/${id}`);
      await axios.post("http://localhost:5000/deptAccept", {
        name: name,
        state: state,
        city: city,
        location: location,
        id: id,
      });
      setCount(count + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/deptRegister/${id}`);
      setCount(count + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Admin</h2>
      <Box id="admin-container">
        <Box id="admin-tabs">
          {" "}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Registered Users" {...a11yProps(0)} />
            <Tab label="Registered Departments" {...a11yProps(1)} />
            <Tab label="Notifications" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box id="admin-content">
          <TabPanel value={value} index={0}>
            <Typography variant="h4" textAlign={"left"} marginBottom={"25px"}>
              Manage Users
            </Typography>
            <Box sx={{ height: 700, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h4" textAlign={"left"} marginBottom={"25px"}>
              Manage Departments
            </Typography>
            <Box sx={{ height: 700, width: "100%" }}>
              <DataGrid
                rows={dept}
                columns={columns_dept}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="h-[85vh] bg-white p-5 flex flex-wrap overflow-y-auto gap-2.5">
              {data.map(function (elem) {
                return (
                  <AdminCard
                    e={elem}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                );
              })}
            </div>
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
