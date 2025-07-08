from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from datetime import datetime
import google.generativeai as genai
import fitz   

# ✅ Configure Gemini API Key
genai.configure(api_key="AIzaSyD_QB8giSHFfYfoNzjFZyolbz0mE6nq62s")

# ✅ Create FastAPI App
app = FastAPI()

# ✅ CORS Settings for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Correct Model Name
model = genai.GenerativeModel(model_name="models/gemini-pro")

# ✅ Chat Request Schema
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(chat: ChatRequest):
    try:
        response = model.generate_content(chat.message)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Error: {e}"}

# ✅ File Upload Endpoint
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    original_filename = file.filename
    name, ext = os.path.splitext(original_filename)
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    new_filename = f"{name}-{timestamp}{ext}"
    file_location = os.path.join(UPLOAD_FOLDER, new_filename)

    with open(file_location, "wb") as f:
        content = await file.read()
        f.write(content)
    
    return {
        "saved_filename": new_filename,
        "original_filename": original_filename,
        "message": "File uploaded successfully"
    }


@app.get("/preview/{filename}")
async def preview_file(filename: str):
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    if not os.path.exists(file_path):
        return {"error": "File not found."}

    try:
        text = ""
        with fitz.open(file_path) as doc:
            for page in doc:
                text += page.get_text()

        return {"filename": filename, "content": text[:5000]}  # Return first 5000 chars
    except Exception as e:
        return {"error": f"Could not read PDF: {e}"}
