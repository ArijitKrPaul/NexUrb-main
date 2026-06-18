import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import { MagnifyingGlassIcon, TrashIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import ExistingUserCard from "./existingUserCard";
import axios from "axios";
export default function UsersComponent() {
  const [members, setMembers] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(
    function () {
      const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const dept_id = user.dept_id;
        try {
          const q = await axios.get(`http://localhost:5000/deptUsers`, {
            params: {
              dept_id: dept_id,
            },
          });
          setUsers(q.data);
          setMembers(users.length);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    },
    [count, users.length],
  );
  const addUsers = () => {
    console.log("hello");
    navigate("/admin/addUsers/add");
  };

  const onDelete = () => {
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white flex p-3 justify-between items-center px-10 shadow-sm">
        <p className="font-bold text-2xl">NexUrb</p>

        <button
          className="bg-blue-500 px-4 py-2 rounded-xl text-white hover:cursor-pointer"
          onClick={addUsers}
        >
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
        {users.map((elem) => {
          return <ExistingUserCard user={elem} del={onDelete} />;
        })}
      </div>
    </div>
  );
}
