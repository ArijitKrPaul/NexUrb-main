import React from "react";
import { CheckIcon, StepsIcon } from "@phosphor-icons/react";
import { Alert, Stack, TextField } from "@mui/material";
import PhotoUpload from "./PhotoUpload";
import { useNavigate } from "react-router-dom";

export default function ComplaintComponent() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, state, city, description);
    setSuccess(true);
    setName("");
    setCity("");
    setEmail("");
    setState("");
    setDescription("");
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div className=" bg-[#f8f9fa] h-screen w-full">
      <div className="bg-white flex h-12 py-1.5 text-2xl px-5 border-b border-gray-300 font-bold">
        <StepsIcon size={34} color="#6065f0" weight="fill" />
        NexUrb
      </div>
      {success && (
        <Alert severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}
      <div className="h-[80%] w-[50%]  m-auto p-2.5">
        <div className="flex-col justify-items-start">
          <p className="text-5xl mb-1.5 font-bold">Lodge Complaint</p>
          <p className="text-2xl text-gray-500">
            Help us maintain the city's precision.Report infrastructure issues
          </p>
          <p className="text-2xl mb-1.5 text-gray-500">
            or service disruptions directly.
          </p>
        </div>
        <div className="h-[95%] bg-white mt-7.5 p-5 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <Stack sx={{ gap: 2, color: "gray" }}>
              <div className="flex justify-between">
                <div className="w-[21vw]">
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER NAME
                  </p>
                  <TextField
                    id="filled-basic"
                    label="Full Name"
                    variant="outlined"
                    type="text"
                    className="w-full"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="w-[21vw]">
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER EMAIL ADDRESS
                  </p>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    className="w-full"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[21vw]">
                  {" "}
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER STATE
                  </p>
                  <TextField
                    id="filled-basic"
                    label="State"
                    variant="outlined"
                    type="text"
                    className="w-full"
                    required
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
                <div className="w-[21vw]">
                  {" "}
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER CITY
                  </p>
                  <TextField
                    id="filled-basic"
                    label="City"
                    variant="outlined"
                    type="text"
                    className="w-full"
                    required
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="text-left font-bold text-sm mb-1.5  text-black">
                  COMPLAINT DESCRIPTION
                </p>
                <TextField
                  id="filled-multiline-flexible"
                  label="Please describe the issue with as much detail as possible"
                  multiline
                  rows={5}
                  variant="outlined"
                  className="w-full"
                  required
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <PhotoUpload />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white w-[20%] h-10 text-l rounded-xl font-bold m-auto mt-5"
              >
                Submit
              </button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
}
