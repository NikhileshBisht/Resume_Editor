import React, { useState } from "react";
import UploadFile from "./component/UploadFile";
import ChatBot from "./component/ChatBot";
import EditPage from "./component/EditPage";

function App() {
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ height: "100vh" }}>
      {!isEditing ? (
        // Full screen upload screen
        <UploadFile
          onUploaded={(fn) => setUploadedFilename(fn)}
          onUploadedSuccess={() => setIsEditing(true)}
        />
      ) : (
        // Two-column layout: edit screen left, chatbot right
        <div style={{ display: "flex", height: "100vh" }}>
          <div style={{ flex: 1, borderRight: "1px solid #ddd" }}>
            <EditPage filename={uploadedFilename} hideChat={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
