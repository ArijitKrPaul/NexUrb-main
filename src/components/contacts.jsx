import React from "react";
import "../css/contacts.css";
import { StepsIcon } from "@phosphor-icons/react";
import { TextField, Backdrop, Stack, Alert } from "@mui/material";
import axios from "axios";

const DepartmentsPage = () => {
  const [stateFilter, setStateFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  // --- New: modal/form state ---
  const [openForm, setOpenForm] = React.useState(false);

  const [deptName, setDeptName] = React.useState("");
  const [deptState, setDeptState] = React.useState("");
  const [deptCity, setDeptCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

  const addContact = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);

    // open the form on click, without removing existing behavior above
    setOpenForm(true);
  };

  const handleAdd = async () => {
    // block if phone is empty OR has an existing validation error
    if (!phone || phoneError) {
      setPhoneError(phoneError || "Phone number is required");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      console.log("No user found in localStorage");
      return;
    }
    const dept_id = userData.dept_id;

    try {
      const q = await axios.post("http://localhost:5000/addContact", {
        name: deptName,
        state: deptState,
        city: deptCity,
        email: email,
        number: phone,
        id: dept_id,
      });
      console.log(q.data);
      closeForm();
    } catch (error) {
      console.log(error);
    }
  };

  const closeForm = () => {
    setOpenForm(false);
    // reset fields + error when closing
    setDeptName("");
    setDeptState("");
    setDeptCity("");
    setPhone("");
    setEmail("");
    setPhoneError("");
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/; // exactly 10 digits
    if (!phoneRegex.test(value)) {
      setPhoneError("Enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  return (
    <div className="h-screen">
      <div className="h-15 bg-white text-left items-center align-middle flex text-2xl px-10 gap-2.5 font-bold border-b border-gray-300">
        <StepsIcon size={32} color="#6065f0" weight="fill" />
        NexUrb
      </div>
      <div className="h-[85vh] w-[95vw] m-auto mt-10 bg-white p-5">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <TextField
              label="Filter by State"
              size="small"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            />
            <TextField
              label="Filter by City"
              size="small"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
            <TextField
              label="Filter by Department Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-400 text-white p-2.5 rounded-xl"
              onClick={addContact}
            >
              Update contact
            </button>
            <button
              className="bg-blue-400 text-white p-2.5 rounded-xl"
              onClick={addContact}
            >
              Add contact
            </button>
          </div>
        </div>
        <div>
          {loading ? <p>Searching for results....</p> : <div>Hello world</div>}
        </div>
      </div>

      {/* --- New: Backdrop form --- */}
      <Backdrop
        open={openForm}
        sx={{ zIndex: 50, color: "#fff" }}
        onClick={(e) => {
          // close only if backdrop itself is clicked, not the form box
          if (e.target === e.currentTarget) closeForm();
        }}
      >
        <div
          className="bg-white rounded-2xl p-7 w-[28vw] flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xl font-bold text-gray-800">
            Add Department Contact
          </p>

          <Stack sx={{ gap: 2 }}>
            <TextField
              label="Department Name"
              size="small"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              required
            />
            <div className="flex gap-3">
              <TextField
                label="State"
                size="small"
                className="w-full"
                value={deptState}
                onChange={(e) => setDeptState(e.target.value)}
                required
              />
              <TextField
                label="City"
                size="small"
                className="w-full"
                value={deptCity}
                onChange={(e) => setDeptCity(e.target.value)}
                required
              />
            </div>
            <TextField
              label="Phone Number"
              size="small"
              value={phone}
              onChange={handlePhoneChange}
              error={Boolean(phoneError)}
              helperText={phoneError}
              required
            />
            <TextField
              label="Email"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Stack>

          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-red-500"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-400 text-white px-5 py-2 rounded-xl"
              onClick={handleAdd}
            >
              Submit
            </button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default DepartmentsPage;
