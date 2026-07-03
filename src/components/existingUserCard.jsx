import { Alert, Backdrop, Box, MenuItem, Select } from "@mui/material";
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import axios from "axios";
import React from "react";

function ExistingUserCard(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleOpen = () => {
    setRole("");
    setOpen(true);
  };
  const handleOpen1 = () => setOpen1(true);

  const handleRoleChange = async () => {
    if (!role || role === props.user.role) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    try {
      await axios.put("http://localhost:5000/updateRole", {
        user_id: props.user.user_id,
        role: role,
      });
      setOpen(false);
      props.del();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.put("http://localhost:5000/delUser", {
        user_id: props.user.user_id,
      });
      setOpen1(false);
      props.del();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 bg-[#F8F6FC] rounded-xl px-5 py-3 mb-2 last:mb-0">
      <div className="flex flex-1 gap-4 min-w-0">
        <p className="font-medium text-sm text-[#211C2B] w-[22%] truncate">
          {props.user.name}
        </p>
        <p className="text-sm text-[#7A7188] w-[35%] truncate">
          {props.user.email}
        </p>
        <p className="text-sm w-[25%] truncate">
          <span className="inline-block bg-[#F1EAFB] text-[#6b46a6] text-xs font-semibold px-2.5 py-1 rounded-full">
            {props.user.role}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          className="flex items-center gap-1.5 border border-[#E4DFEE] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6b46a6] hover:bg-[#F1EAFB] transition"
          onClick={handleOpen}
        >
          <PencilSimpleIcon size={14} weight="bold" />
          Edit
        </button>
        <button
          onClick={handleOpen1}
          className="text-[#B7ADC9] hover:text-[#C0392B] transition"
          aria-label={`Delete ${props.user.name}`}
        >
          <TrashIcon size={20} />
        </button>
      </div>

      {/* Edit role modal */}
      {open && (
        <div className="fixed inset-0 bg-[#211C2B]/40 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
            {error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Pick a different role than the current one.
              </Alert>
            )}
            <h2 className="font-serif text-xl font-semibold text-[#211C2B] mb-4">
              Edit user role
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
              <MenuItem value="Project Manager">Project Manager</MenuItem>
              <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
            </Select>

            <div className="flex gap-2">
              <button
                className="flex-1 h-10 rounded-lg border border-[#E4DFEE] text-sm font-semibold text-[#7A7188] hover:bg-[#F8F6FC] transition"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="flex-1 h-10 rounded-lg bg-[#6b46a6] text-sm font-semibold text-white hover:bg-[#5a3a8c] transition"
                onClick={handleRoleChange}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {open1 && (
        <div className="fixed inset-0 bg-[#211C2B]/40 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="font-serif text-xl font-semibold text-[#211C2B] mb-2">
              Delete user
            </h2>
            <p className="text-sm text-[#7A7188] mb-6">
              Remove {props.user.name} from this organization? This can't be
              undone.
            </p>
            <div className="flex gap-2">
              <button
                className="flex-1 h-10 rounded-lg border border-[#E4DFEE] text-sm font-semibold text-[#7A7188] hover:bg-[#F8F6FC] transition"
                onClick={handleClose1}
              >
                Cancel
              </button>
              <button
                className="flex-1 h-10 rounded-lg bg-[#C0392B] text-sm font-semibold text-white hover:bg-[#a5301f] transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExistingUserCard;
