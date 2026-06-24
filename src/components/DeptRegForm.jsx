import React from "react";
import { Alert, Stack, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";

const DeptRegForm = () => {
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pdf, setPdf] = React.useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = React.useState(null);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const navigate = useNavigate();

  const handlePdfChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setError("");
    setPdf(selectedFile);
    setPdfPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const removePdf = () => {
    setPdf(null);
    setPdfPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdf) {
      setError("Please upload a PDF document");
      return;
    }

    const user_id = JSON.parse(localStorage.getItem("user")).user_id;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("location", location);
    formData.append("user_id", user_id);
    formData.append("pdf", pdf); // field name must match backend's upload.single("pdf")

    try {
      const q = await axios.post(
        "http://localhost:5000/deptRegister",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setError(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 3000);

      console.log(q.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div>
      {success && (
        <Alert severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}
      <div className=" h-[90vh] flex justify-center px-25 py-10 rounded-2xl">
        <form
          className="h-[75vh] w-[75vh] bg-white border border-gray-300 "
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col p-7.5 font-bold gap-2.5 h-[85%] overflow-y-auto">
            <h1 className="text-3xl">Register Your Organisation</h1>
            <p className="font-bold text-gray-400 mb-10">
              Provide details to set up your entity in the NexUrb portal
            </p>
            <Stack sx={{ gap: 1, color: "gray" }}>
              <p className="text-left">Organisation Name</p>
              <TextField
                id="filled-basic"
                variant="outlined"
                label="e.g. Urban Planning Department"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="flex justify-between mt-3.5 mb-3.5">
                <div>
                  <p className="text-left mb-1.5">State</p>
                  <TextField
                    id="filled-basic"
                    label="Enter State"
                    variant="outlined"
                    className="w-[17vw]"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <p className="text-left mb-1.5">City</p>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    label="Enter City"
                    className="w-[17vw]"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>
              <p className="text-left">Specific Location/Address</p>
              <TextField
                id="filled-multiline-static"
                label="Enter full street address and building details"
                multiline
                rows={4}
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              {/* PDF upload section */}
              <p className="text-left mt-3.5">Authorization Document (PDF)</p>

              <input
                type="file"
                accept="application/pdf"
                id="upload-pdf"
                style={{ display: "none" }}
                onChange={handlePdfChange}
              />

              {!pdf ? (
                <label htmlFor="upload-pdf">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#6065f0] hover:bg-[#f5f5ff] transition flex flex-col items-center gap-2">
                    <UploadFileIcon sx={{ fontSize: 36, color: "#6065f0" }} />
                    <p className="text-gray-600 font-medium">
                      Click to upload PDF
                    </p>
                    <p className="text-sm text-gray-400">PDF up to 5MB</p>
                  </div>
                </label>
              ) : (
                <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 relative">
                  <PictureAsPdfIcon sx={{ fontSize: 36, color: "#e53935" }} />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {pdf.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(pdf.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <label htmlFor="upload-pdf">
                      <span className="text-xs text-[#6065f0] cursor-pointer font-semibold">
                        Change PDF
                      </span>
                    </label>
                  </div>
                  <IconButton
                    size="small"
                    onClick={removePdf}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              )}

              {/* Inline PDF preview */}
              {pdfPreviewUrl && (
                <div className="mt-2 border rounded-xl overflow-hidden">
                  <iframe
                    src={pdfPreviewUrl}
                    title="PDF preview"
                    width="100%"
                    height="250px"
                  />
                </div>
              )}
            </Stack>

            {error && (
              <div className="flex justify-center mt-2">
                <p className="bg-red-300 px-3 py-1 text-white rounded-xl text-sm">
                  {error}
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#f8f9fa] h-[15%] flex py-7.5 gap-2.5 justify-end px-5 border-t border-gray-300">
            <button
              type="button"
              className="w-1/6 hover:bg-gray-200 active:scale-90 rounded-xl"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 w-2/6 rounded-xl text-white active:scale-90 "
              type="submit"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeptRegForm;
