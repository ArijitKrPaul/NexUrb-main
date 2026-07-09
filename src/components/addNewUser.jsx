import TextField from "@mui/material/TextField";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@phosphor-icons/react";
import axios from "axios";
import React from "react";
import AddNewUserToDepartmentCard from "./AddUserCard";
import { MenuItem, Select } from "@mui/material";

export default function AddUserComponent() {
  const [user, setUser] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [id, setId] = React.useState();
  const [deptId, setDeptId] = React.useState();

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
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setDeptId(storedUser.dept_id);
    },
    [open],
  );

  const handleClose = async () => {
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
    setRole("");
  };

  const onAdd = (id) => {
    setId(id);
    setOpen(true);
  };

  const filteredUsers = user.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FCFBFE]">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-10 py-4 border-b border-[#E4DFEE]">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[2.5px] text-[#6b46a6] mb-0.5">
            DEPARTMENT ROSTER
          </p>
          <p className="font-serif text-xl font-semibold text-[#211C2B] leading-none">
            Nex<span className="text-[#6b46a6]">Urb</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Search */}
        <div className="flex items-center bg-white border border-[#E4DFEE] rounded-xl px-4 py-2 my-6">
          <MagnifyingGlassIcon size={20} className="mr-2 text-[#7A7188]" />
          <TextField
            variant="standard"
            placeholder="Search by name or email"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{
              "& .MuiInputBase-input": {
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "14px",
              },
            }}
          />
        </div>

        {/* List */}
        <div className="bg-white border border-[#E4DFEE] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_80px] gap-4 px-6 py-3 bg-[#F8F6FC] border-b border-[#E4DFEE]">
            <p className="font-mono text-[11px] font-semibold tracking-wide text-[#6b46a6] uppercase">
              Name
            </p>
            <p className="font-mono text-[11px] font-semibold tracking-wide text-[#6b46a6] uppercase">
              Email
            </p>
            <p className="font-mono text-[11px] font-semibold tracking-wide text-[#6b46a6] uppercase text-right">
              Add
            </p>
          </div>

          <div className="max-h-[65vh] overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <p className="text-sm text-[#7A7188] text-center py-10">
                No users found.
              </p>
            ) : (
              filteredUsers.map((u) => (
                <AddNewUserToDepartmentCard
                  key={u.user_id}
                  props={u}
                  onAdd={onAdd}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Assign role modal */}
      {open && (
        <div className="fixed inset-0 bg-[#211C2B]/40 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="font-serif text-xl font-semibold text-[#211C2B] mb-4">
              Assign a role
            </h2>

            <label className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5">
              ROLE
            </label>
            <Select
              fullWidth
              displayEmpty
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                mb: 4,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "14px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E4DFEE",
                },
              }}
            >
              <MenuItem value="" disabled>
                Choose a role
              </MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Project Manager">Project Manager</MenuItem>
              <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
            </Select>

            <div className="flex gap-2">
              <button
                className="flex-1 h-10 rounded-lg border border-[#E4DFEE] text-sm font-semibold text-[#7A7188] hover:bg-[#F8F6FC] transition"
                onClick={() => {
                  setOpen(false);
                  setRole("");
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 h-10 rounded-lg bg-[#6b46a6] text-sm font-semibold text-white hover:bg-[#5a3a8c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleClose}
                disabled={!role}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
