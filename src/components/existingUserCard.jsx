import { Alert, Backdrop, Box, MenuItem, Select } from "@mui/material";
import { TrashIcon } from "@phosphor-icons/react";
import axios from "axios";
import React from "react";

function ExistingUserCard(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleRoleChange = async () => {
    if (role === props.user.role) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      try {
        const q = await axios.put("http://localhost:5000/updateRole", {
          user_id: props.user.user_id,
          role: role,
        });
        console.log(q.data);
        setOpen(false);
        props.del();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    console.log(props.user.user_id);
    try {
      const q = await axios.put("http://localhost:5000/delUser", {
        user_id: props.user.user_id,
      });
      console.log(q.data);
      setOpen1(false);
      props.del();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-15 bg-[#f8f9fa] rounded-2xl justify-between items-center mb-2.5 p-5">
      <div className="flex w-[80%]">
        <p className="font-bold text-xl text-center w-[20%]">
          {props.user.name}
        </p>
        <p className="font-bold text-xl w-[20%]">{props.user.email}</p>
        <p className="font-bold text-xl w-[60%]">{props.user.role}</p>
      </div>
      <div className="flex w-[20%] justify-between">
        <button
          className="bg-blue-400 p-2.5 w-22.5 rounded-2xl text-white hover:bg-blue-600 hover:cursor-pointer "
          onClick={handleOpen}
        >
          EDIT
        </button>
        <TrashIcon
          size={32}
          className="my-2.5 hover:cursor-pointer"
          onClick={handleOpen1}
        />
      </div>
      {/* //backdrop for role editing */}
      <div>
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={open}
        >
          <div className="h-[25vh] w-[50vh] m-auto ">
            {error && (
              <Alert severity="warning" className="mb-4.5">
                Role not updated!Please select another role.
              </Alert>
            )}
            <div className="p-2.5 bg-white h-full w-full rounded-2xl">
              <h1 className="text-black text-2xl font-bold mb-4">
                EDIT USER ROLE
              </h1>
              <Box className="mb-10">
                <Select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="w-[90%]"
                >
                  <MenuItem value="Project Manager">Project Manager</MenuItem>
                  <MenuItem value="Inventory Manager">
                    Inventory Manager
                  </MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                  <MenuItem value="Support">Support</MenuItem>
                </Select>
              </Box>
              <div className="flex justify-around">
                <button
                  className="bg-red-300 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-500"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-white text-black px-4 py-2 rounded hover:cursor-pointer hover:bg-black hover:text-white"
                  onClick={handleRoleChange}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
      {/* backdrop for deleting user */}
      <div>
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={open1}
        >
          <div className="h-[25vh] w-[50vh] m-auto ">
            {error && (
              <Alert severity="warning" className="mb-4.5">
                Role not updated!Please select another role.
              </Alert>
            )}
            <div className="p-2.5 bg-white h-full w-full rounded-2xl">
              <h1 className="text-black text-2xl font-bold mb-4">
                DELETE USER
              </h1>
              <p className="text-black text-xl pb-3.5">
                Do you want to permanently delete this user from this
                organisation?
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-red-300 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-500"
                  onClick={handleClose1}
                >
                  Cancel
                </button>
                <button
                  className="bg-white text-black px-4 py-2 rounded hover:cursor-pointer hover:bg-black hover:text-white"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    </div>
  );
}

export default ExistingUserCard;
