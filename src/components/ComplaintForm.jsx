import React from "react";
import { CheckIcon, StepsIcon } from "@phosphor-icons/react";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ComplaintComponent() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const [error, setError] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMsg("Please select an image");
      setError(true);
      setTimeout(() => setError(false), 5000);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user.user_id;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("id", user_id);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(true);
      setName("");
      setCity("");
      setEmail("");
      setState("");
      setLocation("");
      setDescription("");
      setFile(null);
      setPreview(null);

      setTimeout(() => {
        navigate("/home");
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <div className=" bg-[#f8f9fa] h-screen w-full">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          py: 1,
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
            LODGE COMPLAINTS
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "26px",
              fontWeight: 600,
              color: "#211C2B",
              lineHeight: 1,
            }}
          >
            Nex<span style={{ color: "#6b46a6" }}>Urb</span>
          </Typography>
        </Box>
      </Toolbar>
      {success && (
        <Alert severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}
      {error && <Alert severity="warning">{msg}</Alert>}
      <div className="h-[80%] w-[50%]  m-auto p-2.5">
        <div className="flex-col justify-items-start">
          <p className="text-5xl mb-1.5 font-bold">Lodge Complaint</p>
          <p className="text-2xl text-gray-500">
            Help us maintain the city's precision.Report infrastructure issues
          </p>
          <p className="text-2xl mb-1.5 text-gray-500">
            or service disruptions directly.
          </p>
        </div>
        <div className="h-[95%] bg-white mt-7.5 p-5 rounded-2xl overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <Stack sx={{ gap: 2, color: "gray" }}>
              <div className="flex justify-between">
                <div className="w-[21vw]">
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER NAME
                  </p>
                  <TextField
                    id="filled-basic"
                    label="Full Name"
                    variant="outlined"
                    type="text"
                    className="w-full"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[21vw]">
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER EMAIL ADDRESS
                  </p>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    className="w-full"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[21vw]">
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER STATE
                  </p>
                  <TextField
                    id="filled-basic"
                    label="State"
                    variant="outlined"
                    type="text"
                    className="w-full"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="w-[21vw]">
                  <p className="text-left font-bold text-sm mb-1.5 text-black">
                    ENTER CITY
                  </p>
                  <TextField
                    id="filled-basic"
                    label="City"
                    variant="outlined"
                    type="text"
                    className="w-full"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <p className="text-left font-bold text-sm mb-1.5 text-black">
                  EXACT LOCATION
                </p>
                <TextField
                  id="filled-basic"
                  label="e.g. Near City Hospital, MG Road"
                  variant="outlined"
                  type="text"
                  className="w-full"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <p className="text-left font-bold text-sm mb-1.5  text-black">
                  COMPLAINT DESCRIPTION
                </p>
                <TextField
                  id="filled-multiline-flexible"
                  label="Please describe the issue with as much detail as possible"
                  multiline
                  rows={3}
                  variant="outlined"
                  className="w-full"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Image upload section */}
              <div>
                <p className="text-left font-bold text-sm mb-1.5 text-black">
                  UPLOAD PHOTO EVIDENCE
                </p>

                <input
                  type="file"
                  accept="image/*"
                  id="upload-photo"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />

                {!preview ? (
                  <label htmlFor="upload-photo">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#6065f0] hover:bg-[#f5f5ff] transition flex flex-col items-center gap-2">
                      <CloudUploadIcon
                        sx={{ fontSize: 40, color: "#6065f0" }}
                      />
                      <p className="text-gray-600 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-400">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="relative border border-gray-200 rounded-xl p-3 flex items-center gap-4">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {file?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(file?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <label htmlFor="upload-photo">
                        <span className="text-xs text-[#6065f0] cursor-pointer font-semibold">
                          Change photo
                        </span>
                      </label>
                    </div>
                    <IconButtonRemove onRemove={removeFile} />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white w-[20%] h-10 text-l rounded-xl font-bold m-auto mt-5"
              >
                Submit
              </button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
}

function IconButtonRemove({ onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
    >
      <CloseIcon sx={{ fontSize: 18 }} />
    </button>
  );
}
