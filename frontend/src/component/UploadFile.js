import React, { useState, useRef } from "react";
import axios from "axios";

function UploadFile({ onUploaded, onUploadedSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [convertedDocx, setConvertedDocx] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
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
      if (onUploadedSuccess) onUploadedSuccess();
      const saved = res.data && res.data.saved_filename ? res.data.saved_filename : "";
      setUploadedFilename(saved);
      setConvertedDocx(saved.toLowerCase().endsWith(".docx") ? saved : "");
      if (onUploaded) onUploaded(saved);
    } catch (err) {
      setMessage("Error uploading file");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ padding: 20 ,height: "calc(100vh - 40px)" }}>
      <h2>Upload File</h2>
      
      {/* Modern Upload Area */}
      <div
        style={{
          border: isDragOver ? "2px dashed #6366f1" : "2px dashed #d1d5db",
          borderRadius: "16px",
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          background: isDragOver ? "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)" : "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Upload Icon */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#e0e7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16L12 8M12 8L15 11M12 8L9 11"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 15V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Main Text */}
        <div style={{ marginBottom: "8px" }}>
          <span style={{ color: "#6366f1", fontWeight: "600" }}>Click here</span>
          <span style={{ color: "#374151" }}> to upload your file or drag and drop</span>
        </div>

        {/* Supported Formats */}
        <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
          Supported Format: PDF, DOCX (10MB each)
        </div>

        {/* Right Side Icons
        <div >
          <div style={{ marginBottom: "8px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ fontSize: "10px", color: "#374151", marginTop: "2px" }}>DOC</div>
          </div>
        </div> */}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".pdf,.docx"
        />
      </div>

      {/* Upload Button */}
      {file && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleUpload}
            style={{
              backgroundColor: "#6366f1",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
            }}
          >
            Upload {file.name}
          </button>
        </div>
      )}

      {/* Messages */}
      {message && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <p style={{ color: message.includes("Error") ? "#dc2626" : "#059669" }}>
            {message}
          </p>
        </div>
      )}

      {/* File Info */}
      {uploadedFilename && (
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Saved as: {uploadedFilename}
          </p>
        </div>
      )}

      {convertedDocx && (
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <p style={{ fontSize: "14px" }}>
            Converted:{" "}
            <a
              href={`http://localhost:8000/uploads/${convertedDocx}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#6366f1", textDecoration: "none" }}
            >
              {convertedDocx}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadFile;
