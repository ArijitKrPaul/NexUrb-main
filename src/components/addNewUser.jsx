import TextField from "@mui/material/TextField";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@phosphor-icons/react";
import axios from "axios";
import React from "react";
import AddNewUserToDepartmentCard from "./AddUserCard";
import {
  Alert,
  Backdrop,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function AddUSerComponent() {
  const [user, setUser] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [id, setId] = React.useState();
  const [deptId, setDeptId] = React.useState();

  const handleClickAway = () => {
    setOpen(false);
  };

  React.useEffect(
    function () {
      const fetchData = async () => {
        try {
          const q = await axios.get("http://localhost:5000/newUser");
          setUser(q.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      const user = JSON.parse(localStorage.getItem("user"));
      setDeptId(user.dept_id);
    },
    [open],
  );

  const handleClose = async () => {
    console.log(role);
    try {
      const q = await axios.put("http://localhost:5000/updateUser", {
        dept_id: deptId,
        role: role,
        user_id: id,
      });
      console.log(q.data);
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  const onAdd = (id) => {
    setId(id);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white flex p-3 justify-between items-center px-10 shadow-sm">
        <p className="font-bold text-2xl">NexUrb</p>
      </div>
      {/* {search area} */}
      <div>
        <div className="flex items-center w-100 bg-gray-200 rounded-xl px-3 py-1 mx-auto my-2.5">
          <MagnifyingGlassIcon size={22} className="mr-2" />

          <TextField
            variant="standard"
            placeholder={search}
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </div>
        {/* card area */}
        <div className=" max-w-4xl mx-auto my-2.5 h-[80vh] bg-white p-2.5 flex-col flex-nowrap overflow-y-auto">
          <div className="columns-3 px-5 mb-2.5">
            <p className="font-bold text-xl">NAME</p>
            <p className="font-bold text-xl mr-20">EMAIL</p>
            <p className="font-bold text-xl mr-20">ACTIONS</p>
          </div>
          {user.map((user) => {
            return (
              <AddNewUserToDepartmentCard
                key={user.user_id}
                props={user}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      </div>
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <div className=" w-[30vh] h-[25vh] bg-amber-50 rounded-2xl grid px-4.5 py-2.5 gap-2 items-center">
            <p className="text-black font-bold text-2xl">Select Role:</p>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Project Manager">Project Manager</MenuItem>
              <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
            </Select>

            <button
              className="bg-gray-500 w-full h-10 rounded-2xl"
              onClick={handleClose}
            >
              Confirm
            </button>
          </div>
        </Backdrop>
      </div>
    </div>
  );
}
