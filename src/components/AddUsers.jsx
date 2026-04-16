import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import { MagnifyingGlassIcon, TrashIcon } from "@phosphor-icons/react";

export default function UsersComponent() {
  const [members, setMembers] = React.useState(0);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white flex p-3 justify-between items-center px-10 shadow-sm">
        <p className="font-bold text-2xl">NexUrb</p>

        <button className="bg-blue-500 px-4 py-2 rounded-xl text-white hover:cursor-pointer">
          Add Users
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-6 space-y-4">
        {/* Total Members Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="font-bold text-gray-400">TOTAL MEMBERS</p>
          <p className="text-4xl mt-2">{members}</p>
        </div>

        {/* Department Roster */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
          <p className="font-bold text-xl text-gray-400">Department Roster</p>

          <div className="flex items-center w-64 bg-gray-200 rounded-xl px-3 py-1">
            <MagnifyingGlassIcon size={22} className="mr-2" />

            <TextField
              variant="standard"
              placeholder="Search by Name"
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
        </div>
      </div>
      <div className=" max-w-4xl mx-auto my-2.5 h-[65vh] bg-white p-2.5 flex-col flex-nowrap overflow-y-auto">
        <div className="flex h-15 bg-[#f8f9fa] rounded-2xl justify-between items-center p-5">
          <p className="font-bold text-xl">Arijit kumar Paul</p>
          <p className="font-bold text-xl mr-20">arijitkmrpl46@gmail.com</p>
          <TrashIcon size={24} weight="thin" />
        </div>
      </div>
    </div>
  );
}
