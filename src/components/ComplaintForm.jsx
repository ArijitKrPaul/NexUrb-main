import React from "react";
import { StepsIcon } from "@phosphor-icons/react";
import { Stack, TextField } from "@mui/material";
import PhotoUpload from "./PhotoUpload";

export default function ComplaintComponent() {
  return (
    <div className=" bg-[#f8f9fa] h-screen w-full">
      <div className="bg-white flex h-12 py-1.5 text-2xl px-5 border-b border-gray-300 font-bold">
        <StepsIcon size={34} color="#6065f0" weight="fill" />
        NexUrb
      </div>
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
                  required
                />
              </div>
            </div>
            <div className="w-full">
              {" "}
              <p className="text-left font-bold text-sm mb-1.5 text-black">
                CONTACT NUMBER
              </p>
              <TextField
                id="filled-basic"
                label="Contact Number"
                variant="outlined"
                type="number"
                className="w-full"
                required
              />
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
        </div>
      </div>
    </div>
  );
}
