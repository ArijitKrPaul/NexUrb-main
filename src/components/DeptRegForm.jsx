import React from "react";
import { Stack, TextField } from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
const DeptRegForm = () => {
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state, name, city, location);

    try {
      const q = await axios.post("http://localhost:5000/deptRegister", {
        name: name,
        state: state,
        city: city,
        location: location,
      });
      setError(false);
      navigate("/home");
      console.log(q.data);
    } catch (err) {
      setError(err.data);
      console.log(err);
    }
  };

  return (
    <div className=" h-[90vh] flex justify-center px-25 py-10 rounded-2xl">
      <form
        className="h-[75vh] w-[75vh] bg-white border border-gray-300 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col p-7.5 font-bold gap-2.5 h-[85%]">
          <h1 className="text-3xl">Register Your Organisation</h1>
          <p
            className="font-bold
           text-gray-400 
           mb-10"
          >
            Provide details to set up your entity in the NexUrb portal
          </p>
          <Stack sx={{ gap: 1, color: "gray" }}>
            <p className="text-left">Organisation Name</p>
            <TextField
              id="filled-basic"
              variant="outlined"
              label="e.g. Urban Planning Department"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <div className="flex justify-between mt-3.5 mb-3.5">
              <div>
                <p className="text-left mb-1.5">State</p>
                <TextField
                  id="filled-basic"
                  label="Enter State"
                  variant="outlined"
                  className="w-[17vw]"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-left mb-1.5">City</p>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  label="Enter City"
                  className="w-[17vw]"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-left">Specific Location/Address</p>
            <TextField
              id="filled-multiline-static"
              label="Enter full street address and building details"
              multiline
              rows={4}
              variant="outlined"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
            />
          </Stack>
          <div className="flex justify-center">
            <p className="bg-red-300 w-50 text-white rounded-xl">{error}</p>
          </div>
        </div>
        <div className="bg-[#f8f9fa] h-[15%] flex py-7.5 gap-2.5 justify-end px-5 border-t border-gray-300">
          <button className="w-1/6 hover:bg-gray-200 active:scale-90 rounded-xl">
            Cancel
          </button>
          <button
            className="bg-blue-400 w-2/6 rounded-xl text-white active:scale-90 "
            type="submit"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeptRegForm;
