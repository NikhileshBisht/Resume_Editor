import React, { useState } from "react";
import EditPage from "./EditPage.js";
import axios from "axios";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      setIsEditing(true); // Go to edit screen
    } catch (err) {
      setMessage("Error uploading file");
    }
  };

  return (
    <>
      {isEditing ? (
        <EditPage file={file} /> 
      ) : (
        <div style={{ padding: 20 }}>
          <h2>Upload File</h2>
          <input type="file" onChange={handleFileChange} />
          <br />
          <button onClick={handleUpload}>Upload</button>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default UploadFile;
