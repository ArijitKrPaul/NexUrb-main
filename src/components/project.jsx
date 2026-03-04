import "../css/project.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Box,
  Toolbar,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
library.add(fas, far, fab);

import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import ProjectCard from "./ProjectCard";

export default function ProjectComponent() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [dept, setDept] = React.useState("");
  const [project, setProject] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [addState, setAddState] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [name, setName] = React.useState("");
  const [dataArr, setDataArr] = React.useState([]);

  const statesWithCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila"],
    Assam: ["Guwahati", "Dibrugarh", "Jorhat", "Silchar"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    Delhi: ["New Delhi"],
    Goa: ["Panaji", "Margao", "Vasco da Gama"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Haryana: ["Chandigarh", "Faridabad", "Gurgaon", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Manipur: ["Imphal"],
    Meghalaya: ["Shillong"],
    Mizoram: ["Aizawl"],
    Nagaland: ["Kohima", "Dimapur"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    Sikkim: ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    Tripura: ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state, city);

    const res = await axios.get("http://localhost:5000/project", {
      params: {
        state: state,
        city: city,
      },
    });
    console.log(res);
    setDataArr(res.data);
  };

  const handleForm = async () => {
    console.log(dept, project, location, desc, addState, date);
    setDept("");
    setProject("");
    setLocation("");
    setAddState("");
    setDesc("");
    setDate(null);

    const q = await axios.post("http://localhost:5000/project", {
      name: name,
      type: project,
      dept_name: dept,
      description: desc,
      state: addState,
      city: location,
    });

    console.log(q);

    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Toolbar id="ProjectNavbar">
        <p>NexUrb</p>
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="1x"
          id="addButton"
          color="black"
          onClick={handleOpen}
        />
      </Toolbar>
      <div class="projectcontainer">
        <div class="search-area">
          <FormControl fullWidth variant="filled">
            <InputLabel>State</InputLabel>
            <Select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity(""); // Reset city when state changes
              }}
            >
              {Object.keys(statesWithCities).map((stateName) => (
                <MenuItem key={stateName} value={stateName}>
                  {stateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="filled" disabled={!state} fullWidth>
            <InputLabel>City</InputLabel>
            <Select value={city} onChange={(e) => setCity(e.target.value)}>
              {state &&
                statesWithCities[state].map((cityName) => (
                  <MenuItem key={cityName} value={cityName}>
                    {cityName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <Button id="search-button" onClick={handleSubmit}>
          Search
        </Button>

        <div className="flex flex-wrap overflow-y-auto h-[75vh] items-center w-full gap-5 justify-center">
          {dataArr.map(function (elem) {
            return <ProjectCard data={elem} />;
          })}
        </div>

        {
          <Backdrop
            sx={(theme) => ({
              color: "black",
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={open}
          >
            <Stack
              gap={2}
              width={450}
              alignContent={"center"}
              textAlign={"center"}
              className="addForm"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                mb={2}
              >
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, textAlign: "left" }}
                >
                  Add New Project
                </Typography>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="2x"
                  color="red"
                  className="xMark"
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                />
              </Box>

              <TextField
                id="filled-basic"
                label="Department Name"
                variant="filled"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
              />
              <TextField
                id="filled-basic"
                label="Project Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                id="filled-basic"
                label="Project Type"
                variant="filled"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              />
              <TextField
                id="filled-multiline-flexible"
                label="Project Description"
                multiline
                maxRows={4}
                variant="filled"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <TextField
                id="filled-basic"
                label="State"
                variant="filled"
                value={addState}
                onChange={(e) => setAddState(e.target.value)}
                required
              />
              <TextField
                id="filled-basic"
                label="City"
                variant="filled"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <Button
                variant="contained"
                className="addFormButton"
                sx={{ backgroundColor: "#6b46a6" }}
                onClick={handleForm}
              >
                ADD
              </Button>
            </Stack>
          </Backdrop>
        }
      </div>
    </div>
  );
}
