import "../css/project.css";
import * as React from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import ProjectCard from "./ProjectCard";

export default function EmployeeProjectComponent() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
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

  const handleSubmit = async () => {
    try {
      const res = await axios.get("http://localhost:5000/project", {
        params: {
          state: state,
          city: city,
        },
      });

      setDataArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toolbar id="ProjectNavbar">
        <p>NexUrb</p>
      </Toolbar>

      <div className="projectcontainer">
        <div className="search-area">
          <FormControl fullWidth variant="filled">
            <InputLabel>State</InputLabel>
            <Select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity("");
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
          {dataArr.map((elem, index) => (
            <ProjectCard key={index} data={elem} />
          ))}
        </div>
      </div>
    </div>
  );
}
