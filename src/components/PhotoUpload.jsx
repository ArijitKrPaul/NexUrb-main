import React, { useState } from "react";
import { Button } from "@mui/material";

export default function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div>
      <div className="flex justify-evenly">
        {/* Hidden Input */}
        <input
          type="file"
          accept="image/*"
          id="upload-photo"
          style={{ display: "none" }}
          onChange={handleChange}
        />

        {/* Upload Box */}
        <label htmlFor="upload-photo">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition w-[20vw]">
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>

            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#6065f0" }}
            >
              Choose File
            </Button>
          </div>
        </label>

        {/* File Name */}
        {file && (
          <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
        )}

        {/* Image Preview */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
}
