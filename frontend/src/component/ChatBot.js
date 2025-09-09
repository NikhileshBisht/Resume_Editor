import React, { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: currentInput,
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h2>AI Chatbot</h2>
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          overflowY: "auto",
          marginBottom: 10,
          minHeight: 0,
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
  );
}

export default ChatBot;


