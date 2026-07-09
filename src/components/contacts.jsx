import React from "react";
import "../css/contacts.css";
import { StepsIcon } from "@phosphor-icons/react";
import {
  TextField,
  Backdrop,
  Stack,
  Alert,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Shared field styling to match the rest of the app
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "'IBM Plex Sans', sans-serif",
    backgroundColor: "#FBFAFD",
    "& fieldset": { borderColor: "#E4DFEE" },
    "&:hover fieldset": { borderColor: "#C9BEDD" },
    "&.Mui-focused fieldset": { borderColor: "#6b46a6", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'IBM Plex Sans', sans-serif",
    color: "#7A7188",
    "&.Mui-focused": { color: "#6b46a6" },
  },
};

const SectionLabel = ({ children }) => (
  <Typography
    sx={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "1.8px",
      color: "#6b46a6",
      textAlign: "left",
      mb: 1.25,
      "&::before": { content: '"— "' },
    }}
  >
    {children.toUpperCase()}
  </Typography>
);

// Card used to display a single department contact
const ContactCard = ({ contact }) => (
  <Box
    sx={{
      width: 300,
      backgroundColor: "#FFFFFF",
      border: "1px solid #E4DFEE",
      borderRadius: "14px",
      p: 2.5,
      boxShadow: "0 8px 24px -16px rgba(33,28,43,0.25)",
      transition: "box-shadow 0.15s ease, transform 0.15s ease",
      "&:hover": {
        boxShadow: "0 14px 30px -14px rgba(33,28,43,0.35)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <Typography
      sx={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "19px",
        fontWeight: 600,
        color: "#211C2B",
        mb: 0.5,
      }}
    >
      {contact.name}
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
      <FontAwesomeIcon
        icon={faLocationDot}
        size="xs"
        style={{ color: "#6b46a6" }}
      />
      <Typography
        sx={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.5px",
          color: "#6b46a6",
          textTransform: "uppercase",
        }}
      >
        {contact.city}, {contact.state}
      </Typography>
    </Box>

    <Stack sx={{ gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FontAwesomeIcon
          icon={faPhone}
          size="xs"
          style={{ color: "#B7ADC9" }}
        />
        <Typography
          sx={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "13px",
            color: "#211C2B",
          }}
        >
          {contact.phone_number}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FontAwesomeIcon
          icon={faEnvelope}
          size="xs"
          style={{ color: "#B7ADC9" }}
        />
        <Typography
          sx={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "13px",
            color: "#211C2B",
          }}
        >
          {contact.email}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <FontAwesomeIcon
          icon={faLocationDot}
          size="xs"
          style={{ color: "#B7ADC9", marginTop: "3px" }}
        />
        <Typography
          sx={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "13px",
            color: "#211C2B",
          }}
        >
          {contact.location}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

const DepartmentsPage = () => {
  const [stateFilter, setStateFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  // --- Add-contact modal/form state ---
  const [openForm, setOpenForm] = React.useState(false);

  const [deptName, setDeptName] = React.useState("");
  const [deptState, setDeptState] = React.useState("");
  const [deptCity, setDeptCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [existingError, setExistingError] = React.useState("");

  // --- Update-contact modal/form state (kept fully separate from Add) ---
  const [openUpdateForm, setOpenUpdateForm] = React.useState(false);

  const [updDeptName, setUpdDeptName] = React.useState("");
  const [updDeptState, setUpdDeptState] = React.useState("");
  const [updDeptCity, setUpdDeptCity] = React.useState("");
  const [updPhone, setUpdPhone] = React.useState("");
  const [updEmail, setUpdEmail] = React.useState("");
  const [updPhoneError, setUpdPhoneError] = React.useState("");
  const [updateError, setUpdateError] = React.useState("");
  const [updLocation, setUpdLocation] = React.useState("");
  const [update, setUpdate] = React.useState(0);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const q = await axios.get("http://localhost:5000/getContact", {
          params: {
            state: stateFilter,
            city: cityFilter,
            name: name,
          },
        });
        setData(q.data);
        console.log(q.data);
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [stateFilter, cityFilter, name, update]);

  // ---------- Add contact: open/close + submit ----------
  const addContact = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);

    setExistingError("");
    // open the Add form on click, without removing existing behavior above
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    // reset Add-form fields + error when closing
    setDeptName("");
    setDeptState("");
    setDeptCity("");
    setPhone("");
    setEmail("");
    setPhoneError("");
    setExistingError("");
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

    setExistingError("");

    try {
      await axios.post("http://localhost:5000/addContact", {
        name: deptName,
        state: deptState,
        city: deptCity,
        email: email,
        number: phone,
        id: dept_id,
      });

      closeForm();
    } catch (error) {
      // axios rejects the promise for any non-2xx status, so a 409
      // (department already has a contact) lands here, not in the try block
      if (error.response && error.response.status === 409) {
        const responseData = error.response.data;
        setExistingError(
          typeof responseData === "string"
            ? responseData
            : responseData?.message || "This department already has a contact.",
        );
        return; // keep the form open so the message is visible
      }
      console.log(error);
    }
  };

  // ---------- Update contact: open/close + submit (fully separate) ----------
  const updateContact = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      console.log("No user found in localStorage");
      return;
    }
    const dept_id = userData.dept_id;

    setUpdateError("");

    try {
      // Look up the department's existing contact so the Update form
      // can be pre-filled with current values.
      const res = await axios.get("http://localhost:5000/addContact", {
        params: {
          id: dept_id,
        },
      });

      console.log(res.data);
      const existing = res.data;
      const hasExistingContact =
        existing &&
        (Array.isArray(existing)
          ? existing.length > 0
          : Object.keys(existing).length > 0);

      if (hasExistingContact) {
        const record = Array.isArray(existing) ? existing[0] : existing;
        setUpdDeptName(record.name || "");
        setUpdDeptState(record.state || "");
        setUpdDeptCity(record.city || "");
        setUpdPhone(record.phone_number || record.number || "");
        setUpdEmail(record.email || "");
        setUpdLocation(record.location || "");
        setOpenUpdateForm(true);
      } else {
        setUpdateError("No existing contact found for this department yet.");
      }
    } catch (error) {
      console.log(error);
      setUpdateError("Unable to load the existing contact. Please try again.");
    }
  };

  const closeUpdateForm = () => {
    setOpenUpdateForm(false);
    // reset Update-form fields + error when closing
    setUpdDeptName("");
    setUpdDeptState("");
    setUpdDeptCity("");
    setUpdPhone("");
    setUpdEmail("");
    setUpdPhoneError("");
    setUpdateError("");
  };

  const validateUpdatePhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setUpdPhoneError("Enter a valid 10-digit phone number");
    } else {
      setUpdPhoneError("");
    }
  };

  const handleUpdatePhoneChange = (e) => {
    const value = e.target.value;
    setUpdPhone(value);
    validateUpdatePhone(value);
  };

  const handleUpdateSubmit = async () => {
    if (!updPhone || updPhoneError) {
      setUpdPhoneError(updPhoneError || "Phone number is required");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      console.log("No user found in localStorage");
      return;
    }
    const dept_id = userData.dept_id;

    setUpdateError("");

    try {
      await axios.put("http://localhost:5000/updateContact", {
        name: updDeptName,
        state: updDeptState,
        city: updDeptCity,
        email: updEmail,
        number: updPhone,
        location: updLocation,
        id: dept_id,
      });

      setUpdate(update + 1);
      closeUpdateForm();
    } catch (error) {
      console.log(error);
      const responseData = error.response?.data;
      setUpdateError(
        typeof responseData === "string"
          ? responseData
          : responseData?.message ||
              "Unable to update contact. Please try again.",
      );
    }
  };

  return (
    <div className="h-screen" style={{ backgroundColor: "#F8F7FB" }}>
      {/* ---------- Header ---------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          py: 2,
          borderBottom: "1px solid #E4DFEE",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              color: "#6b46a6",
              mb: "2px",
            }}
          >
            DEPARTMENT DIRECTORY
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "26px",
              fontWeight: 600,
              color: "#211C2B",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <StepsIcon size={24} color="#6b46a6" weight="fill" />
            Nex<span style={{ color: "#6b46a6" }}>Urb</span>
          </Typography>
        </Box>
      </Box>

      {/* ---------- Content card ---------- */}
      <Box
        sx={{
          minHeight: "78vh",
          width: "95vw",
          m: "auto",
          mt: 4,
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E4DFEE",
          boxShadow: "0 10px 30px -18px rgba(33,28,43,0.25)",
          p: { xs: 2.5, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Filter by State"
              size="small"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              sx={fieldSx}
            />
            <TextField
              label="Filter by City"
              size="small"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              sx={fieldSx}
            />
            <TextField
              label="Filter by Department Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={fieldSx}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              onClick={updateContact}
              variant="outlined"
              sx={{
                borderColor: "#6b46a6",
                color: "#6b46a6",
                borderRadius: "10px",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                px: 2.5,
                "&:hover": {
                  borderColor: "#553c8f",
                  backgroundColor: "#F1EAFB",
                },
              }}
            >
              Update contact
            </Button>
            <Button
              onClick={addContact}
              variant="contained"
              sx={{
                backgroundColor: "#6b46a6",
                borderRadius: "10px",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                px: 2.5,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#553c8f",
                  boxShadow: "0 8px 20px -8px rgba(107,70,166,0.6)",
                },
              }}
            >
              Add contact
            </Button>
          </Box>
        </Box>

        {/* Shown inline if the Update button couldn't find/open a contact */}
        {updateError && !openUpdateForm && (
          <Alert
            severity="warning"
            onClose={() => setUpdateError("")}
            sx={{
              mt: 2,
              borderRadius: "10px",
              backgroundColor: "#FFF3CD",
              color: "#8A6100",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "13px",
              alignItems: "center",
              "& .MuiAlert-icon": { color: "#8A6100" },
            }}
          >
            {updateError}
          </Alert>
        )}

        <Box sx={{ mt: 4 }}>
          {loading ? (
            <Typography
              sx={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                color: "#7A7188",
                fontSize: "14px",
              }}
            >
              Searching for results....
            </Typography>
          ) : data.length === 0 ? (
            <Typography
              sx={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                color: "#211C2B",
              }}
            >
              No contacts found
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {data.map((contact, index) => (
                <ContactCard
                  key={contact.dept_id || contact.id || index}
                  contact={contact}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* --- Add Contact Backdrop --- */}
      <Backdrop
        open={openForm}
        sx={{
          zIndex: 50,
          color: "#fff",
          backgroundColor: "rgba(33, 28, 43, 0.55)",
          backdropFilter: "blur(3px)",
        }}
        onClick={(e) => {
          // close only if backdrop itself is clicked, not the form box
          if (e.target === e.currentTarget) closeForm();
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: 480,
            maxWidth: "92vw",
            maxHeight: "88vh",
            overflowY: "auto",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            backgroundImage: `
              linear-gradient(rgba(107,70,166,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(107,70,166,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            boxShadow:
              "0 24px 60px -16px rgba(33,28,43,0.45), 0 0 0 1px rgba(228,223,238,1)",
            p: { xs: 3, sm: 4.5 },
            fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={2}
          >
            <Box textAlign="left">
              <Typography
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "2.5px",
                  color: "#6b46a6",
                  mb: 0.5,
                }}
              >
                DIRECTORY INTAKE FORM
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#211C2B",
                  lineHeight: 1.15,
                }}
              >
                Add Department Contact
              </Typography>
            </Box>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              onClick={closeForm}
              style={{
                cursor: "pointer",
                color: "#B7ADC9",
                marginTop: "4px",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6b46a6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#B7ADC9")}
            />
          </Box>

          {/* double rule under header */}
          <Box mb={3}>
            <Box
              sx={{ height: "2px", backgroundColor: "#211C2B", mb: "3px" }}
            />
            <Box sx={{ height: "1px", backgroundColor: "#E4DFEE" }} />
          </Box>

          {/* Duplicate-contact warning */}
          {existingError && (
            <Alert
              severity="warning"
              onClose={() => setExistingError("")}
              sx={{
                mb: 3,
                borderRadius: "10px",
                backgroundColor: "#FFF3CD",
                color: "#8A6100",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "13px",
                alignItems: "center",
                "& .MuiAlert-icon": { color: "#8A6100" },
              }}
            >
              {existingError}
            </Alert>
          )}

          <SectionLabel>Department Identity</SectionLabel>
          <Stack sx={{ gap: 2, mb: 3 }}>
            <TextField
              label="Department Name"
              size="small"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              required
              fullWidth
              sx={fieldSx}
            />
            <Box display="flex" gap={2}>
              <TextField
                label="State"
                size="small"
                fullWidth
                value={deptState}
                onChange={(e) => setDeptState(e.target.value)}
                required
                sx={fieldSx}
              />
              <TextField
                label="City"
                size="small"
                fullWidth
                value={deptCity}
                onChange={(e) => setDeptCity(e.target.value)}
                required
                sx={fieldSx}
              />
            </Box>
          </Stack>

          <SectionLabel>Contact Details</SectionLabel>
          <Stack sx={{ gap: 2, mb: 3.5 }}>
            <TextField
              label="Phone Number"
              size="small"
              value={phone}
              onChange={handlePhoneChange}
              error={Boolean(phoneError)}
              helperText={phoneError}
              required
              fullWidth
              sx={fieldSx}
            />
            <TextField
              label="Department Email"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={fieldSx}
            />
          </Stack>

          <Box display="flex" justifyContent="flex-end" gap={1.5}>
            <Button
              type="button"
              onClick={closeForm}
              sx={{
                color: "#7A7188",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                borderRadius: "10px",
                px: 2.5,
                "&:hover": { backgroundColor: "#FDEDEC", color: "#C0392B" },
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              variant="contained"
              sx={{
                backgroundColor: "#6b46a6",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                borderRadius: "10px",
                px: 3,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#553c8f",
                  boxShadow: "0 8px 20px -8px rgba(107,70,166,0.6)",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Backdrop>

      {/* --- Update Contact Backdrop (separate open/close + fields from Add) --- */}
      <Backdrop
        open={openUpdateForm}
        sx={{
          zIndex: 50,
          color: "#fff",
          backgroundColor: "rgba(33, 28, 43, 0.55)",
          backdropFilter: "blur(3px)",
        }}
        onClick={(e) => {
          // close only if backdrop itself is clicked, not the form box
          if (e.target === e.currentTarget) closeUpdateForm();
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: 480,
            maxWidth: "92vw",
            maxHeight: "88vh",
            overflowY: "auto",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            backgroundImage: `
              linear-gradient(rgba(107,70,166,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(107,70,166,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            boxShadow:
              "0 24px 60px -16px rgba(33,28,43,0.45), 0 0 0 1px rgba(228,223,238,1)",
            p: { xs: 3, sm: 4.5 },
            fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={2}
          >
            <Box textAlign="left">
              <Typography
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "2.5px",
                  color: "#6b46a6",
                  mb: 0.5,
                }}
              >
                DIRECTORY UPDATE FORM
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#211C2B",
                  lineHeight: 1.15,
                }}
              >
                Update Department Contact
              </Typography>
            </Box>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              onClick={closeUpdateForm}
              style={{
                cursor: "pointer",
                color: "#B7ADC9",
                marginTop: "4px",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6b46a6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#B7ADC9")}
            />
          </Box>

          {/* double rule under header */}
          <Box mb={3}>
            <Box
              sx={{ height: "2px", backgroundColor: "#211C2B", mb: "3px" }}
            />
            <Box sx={{ height: "1px", backgroundColor: "#E4DFEE" }} />
          </Box>

          {/* Update-specific error/warning */}
          {updateError && (
            <Alert
              severity="warning"
              onClose={() => setUpdateError("")}
              sx={{
                mb: 3,
                borderRadius: "10px",
                backgroundColor: "#FFF3CD",
                color: "#8A6100",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "13px",
                alignItems: "center",
                "& .MuiAlert-icon": { color: "#8A6100" },
              }}
            >
              {updateError}
            </Alert>
          )}

          <SectionLabel>Department Identity</SectionLabel>
          <Stack sx={{ gap: 2, mb: 3 }}>
            <TextField
              label="Department Name"
              size="small"
              value={updDeptName}
              onChange={(e) => setUpdDeptName(e.target.value)}
              required
              fullWidth
              sx={fieldSx}
            />
            <Box display="flex" gap={2}>
              <TextField
                label="State"
                size="small"
                fullWidth
                value={updDeptState}
                onChange={(e) => setUpdDeptState(e.target.value)}
                required
                sx={fieldSx}
              />
              <TextField
                label="City"
                size="small"
                fullWidth
                value={updDeptCity}
                onChange={(e) => setUpdDeptCity(e.target.value)}
                required
                sx={fieldSx}
              />
            </Box>
          </Stack>
          <TextField
            label="Address"
            size="small"
            fullWidth
            value={updLocation}
            onChange={(e) => setUpdLocation(e.target.value)}
            required
            sx={fieldSx}
          />

          <SectionLabel>Contact Details</SectionLabel>
          <Stack sx={{ gap: 2, mb: 3.5 }}>
            <TextField
              label="Phone Number"
              size="small"
              value={updPhone}
              onChange={handleUpdatePhoneChange}
              error={Boolean(updPhoneError)}
              helperText={updPhoneError}
              required
              fullWidth
              sx={fieldSx}
            />
            <TextField
              label="Department Email"
              size="small"
              type="email"
              value={updEmail}
              onChange={(e) => setUpdEmail(e.target.value)}
              required
              fullWidth
              sx={fieldSx}
            />
          </Stack>

          <Box display="flex" justifyContent="flex-end" gap={1.5}>
            <Button
              type="button"
              onClick={closeUpdateForm}
              sx={{
                color: "#7A7188",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                borderRadius: "10px",
                px: 2.5,
                "&:hover": { backgroundColor: "#FDEDEC", color: "#C0392B" },
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpdateSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#6b46a6",
                textTransform: "none",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                borderRadius: "10px",
                px: 3,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#553c8f",
                  boxShadow: "0 8px 20px -8px rgba(107,70,166,0.6)",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
};

export default DepartmentsPage;
