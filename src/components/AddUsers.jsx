import React from "react";
import { TextField } from "@mui/material";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import ExistingUserCard from "./existingUserCard";
import axios from "axios";

export default function UsersComponent() {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(
    function () {
      const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const dept_id = user.dept_id;
        try {
          const q = await axios.get(`http://localhost:5000/deptUsers`, {
            params: { dept_id: dept_id },
          });
          setUsers(q.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    },
    [count],
  );

  const addUsers = () => {
    navigate("/admin/addUsers/add");
  };

  const onDelete = () => {
    setCount(count + 1);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FCFBFE]">
      {/* Header */}
      <div className="bg-white flex justify-between items-center px-10 py-4 border-b border-[#E4DFEE]">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[2.5px] text-[#6b46a6] mb-0.5">
            DEPARTMENT
          </p>
          <p className="font-serif text-xl font-semibold text-[#211C2B] leading-none">
            Nex<span className="text-[#6b46a6]">Urb</span>
          </p>
        </div>

        <button
          className="bg-[#6b46a6] px-4 py-2 rounded-lg text-white text-sm font-semibold hover:bg-[#5a3a8c] transition"
          onClick={addUsers}
        >
          Add users
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-6 px-4 space-y-4">
        {/* Total Members Card */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4DFEE]">
          <p className="font-mono text-[11px] font-semibold tracking-wide text-[#7A7188] uppercase">
            Total members
          </p>
          <p className="font-serif text-4xl font-semibold text-[#211C2B] mt-1">
            {users.length}
          </p>
        </div>

        {/* Department Roster header + search */}
        <div className="bg-white p-4 rounded-2xl border border-[#E4DFEE] flex justify-between items-center gap-4">
          <p className="font-serif text-lg font-semibold text-[#211C2B]">
            Department roster
          </p>

          <div className="flex items-center w-72 bg-[#F8F6FC] border border-[#E4DFEE] rounded-xl px-3 py-1">
            <MagnifyingGlassIcon size={18} className="mr-2 text-[#7A7188]" />
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
        </div>
      </div>

      {/* Roster list */}
      <div className="max-w-4xl mx-auto my-4 px-4">
        <div className="bg-white border border-[#E4DFEE] rounded-2xl p-2.5 max-h-[60vh] overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <p className="text-sm text-[#7A7188] text-center py-10">
              {users.length === 0
                ? "No users yet."
                : "No users match your search."}
            </p>
          ) : (
            filteredUsers.map((elem) => (
              <ExistingUserCard key={elem.user_id} user={elem} del={onDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
