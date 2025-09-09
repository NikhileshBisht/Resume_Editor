# Resume Editor Backend

This FastAPI backend provides document upload, conversion, modification, and **real-time preview** capabilities for resume editing.

## 🚀 **Key Features**

### 1. **Document Upload & Conversion**
- Upload PDF or DOCX files
- Automatic PDF to DOCX conversion
- File management with timestamped naming

### 2. **AI-Powered Document Modification**
- **Real-time document editing** based on natural language prompts
- Uses Groq AI (llama-3.3-70b-versatile model) for intelligent modifications
- Maintains document structure and formatting
- Supports both paragraphs and tables

### 3. **🔄 Real-Time Preview Updates**
- **Automatic preview refresh** after every document modification
- **No manual refresh needed** - see changes instantly
- Frontend gets updated content immediately after AI modifications
- Supports both PDF and DOCX formats

## 📡 **API Endpoints**

### Chat & Document Modification
```
POST /chat
```
**Request Body:**
```json
{
    "message": "Modify my resume to be more professional and add JavaScript skills"
}
```

**Response (Document Modified):**
```json
{
    "response": "Document 'resume-20241201.docx' has been successfully modified according to your request. Here's the updated content:",
    "document_modified": true,
    "filename": "resume-20241201.docx",
    "updated_content": "Modified resume content here...",
    "content_type": "docx"
}
```

**Response (Regular Chat):**
```json
{
    "response": "I can help you with resume writing tips...",
    "document_modified": false
}
```

### File Upload
```
POST /upload
```
Upload a PDF or DOCX file. The system will:
- Convert PDFs to DOCX automatically
- Set the uploaded file as the current active document
- Return the saved filename

### Document Preview
```
GET /preview/{filename}
```
Get the text content of a specific document for preview purposes.

### Current Document Preview (NEW!)
```
GET /current-preview
```
Get the **latest preview content** of the currently active document. This is perfect for real-time updates!

### Current Document Status
```
GET /current-document
```
Get the filename of the currently active document.

### File Download
```
GET /download/{filename}
```
Download a specific file.

## 🔄 **How Real-Time Updates Work**

1. **Upload a Document**: Upload a PDF or DOCX file to set it as the active document
2. **Send Modification Request**: Use the chat endpoint with keywords like "modify", "edit", "change", "update", "improve", "rewrite", "resume", "document", "cv", or "curriculum vitae"
3. **AI Processing**: The system sends the current document content and your request to Groq AI
4. **Document Update**: The AI modifies the document according to your instructions
5. **🔄 Automatic Preview Update**: The response includes the updated content, so your frontend shows changes immediately
6. **Real-time Display**: No need to call preview endpoints separately - everything updates automatically!

## 💻 **Frontend Integration**

### Automatic Preview Updates
When you send a modification request, the response automatically includes:
- `document_modified: true` - indicates the document was changed
- `updated_content` - the new document content ready to display
- `filename` - the modified document name
- `content_type` - document type for proper rendering

### Frontend Implementation Example
```javascript
// Send modification request
const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: "Make my resume more professional" })
});

const result = await response.json();

if (result.document_modified) {
    // Document was modified - update preview immediately
    document.getElementById('previewContent').textContent = result.updated_content;
    
    // Show success message
    showStatus('Document updated! Preview refreshed automatically.');
}
```

## 📁 **Complete Frontend Example**

I've included a complete HTML frontend example (`frontend_example.html`) that demonstrates:
- File upload with drag & drop
- Real-time chat with AI
- Automatic preview updates after modifications
- Document information display
- Download functionality

## 🧪 **Testing**

Run the test script to verify document modification functionality:
```bash
python test_modification.py
```

## 🚀 **Quick Start**

1. **Set up your Groq API key** in a `.env` file:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

2. **Start the backend server**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

3. **Open the frontend example**:
   - Open `frontend_example.html` in your browser
   - Upload a resume
   - Start chatting with modification requests!

## 🔧 **Technical Details**

- **Document Processing**: Uses `python-docx` for DOCX manipulation
- **AI Integration**: Groq API with llama-3.3-70b-versatile model
- **Async Operations**: Non-blocking document modifications using thread executors
- **Real-time Updates**: Automatic content delivery after modifications
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **File Management**: Automatic cleanup and organization of uploaded files

## 🎯 **Use Cases**

- **Resume Optimization**: "Make my resume more professional"
- **Skill Addition**: "Add JavaScript and React skills to my resume"
- **Content Improvement**: "Rewrite my summary to be more compelling"
- **Format Updates**: "Update my experience section with recent projects"
- **Language Enhancement**: "Make my achievements more impactful"

## 🔒 **Security Notes**

- Only PDF and DOCX files are allowed
- File uploads are restricted to the uploads directory
- CORS is configured for localhost:3000 (frontend)
- API keys are stored in environment variables

## 📱 **Frontend Requirements**

Your frontend should:
1. **Handle file uploads** via the `/upload` endpoint
2. **Send chat messages** via the `/chat` endpoint
3. **Display real-time updates** using the `updated_content` from responses
4. **Show modification status** using the `document_modified` flag
5. **Provide download links** using the `/download/{filename}` endpoint

The system is designed to provide a seamless, real-time editing experience where users can see their document changes immediately after each AI modification!
