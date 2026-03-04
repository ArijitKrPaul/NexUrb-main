import { Stack, TextField } from "@mui/material";
import { StepsIcon } from "@phosphor-icons/react";
import React from "react";
import DeptRegForm from "./DeptRegForm";

const DeptReg = () => {
  return (
    <div className="bg-[#f8f9fa] h-screen">
      <div className="h-15 bg-white text-left items-center align-middle flex text-2xl px-10 gap-2.5 font-bold border-b border-gray-300">
        <StepsIcon size={32} color="#6065f0" weight="fill" />
        NexUrb
      </div>
      <DeptRegForm />
    </div>
  );
};

export default DeptReg;
