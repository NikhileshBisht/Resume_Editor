import React, { useState } from "react";
import axios from "axios";

const EditPage = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  // Simulate selecting a PDF to preview — you can later add upload logic
  const handleSelectPdf = async () => {
    const filename = "resume-20250622150233.pdf"; // Replace with your uploaded file
    setPdfUrl(`http://localhost:8000/uploads/${filename}`);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
      });

      const botMsg = { sender: "bot", text: res.data.response };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to chatbot." },
      ]);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left PDF Preview Half */}
      <div style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}>
        <h3>PDF Preview</h3>
        <button
          onClick={handleSelectPdf}
          style={{
            marginBottom: 10,
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Load PDF
        </button>

        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            style={{ width: "100%", height: "90%", border: "1px solid #ccc" }}
          />
        ) : (
          <p>No PDF loaded.</p>
        )}
      </div>

      {/* Right Chatbot Half */}
      <div style={{ flex: 1, padding: 20, borderLeft: "1px solid #ddd" }}>
        <h2>AI Chatbot</h2>
        <div
          style={{
            height: "80%",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 10,
            overflowY: "auto",
            marginBottom: 10,
          }}
        >
          {chat.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: 8,
                  borderRadius: 10,
                  background: msg.sender === "user" ? "#007bff" : "#eee",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ccc",
              marginRight: 8,
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
