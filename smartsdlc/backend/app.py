from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import fitz  # PyMuPDF
import os, requests
from dotenv import load_dotenv

load_dotenv()

WATSONX_API_KEY = os.getenv("WATSONX_API_KEY", "")
PROJECT_ID = os.getenv("WATSONX_PROJECT_ID", "")
MODEL_ID = os.getenv("WATSONX_MODEL_ID", "granite-20b")
WATSONX_BASE = os.getenv("WATSONX_BASE", "https://us-south.ml.cloud.ibm.com")

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {WATSONX_API_KEY}"
}

app = FastAPI(title="SmartSDLC API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve built frontend
app.mount("/", StaticFiles(directory="static", html=True), name="static")

async def watsonx_complete(prompt: str) -> str:
    """Call Watsonx or return demo text if credentials missing."""
    if not WATSONX_API_KEY:
        return "Demo response. Configure Watsonx credentials to get real output."
    payload = {
        "model_id": MODEL_ID,
        "input": prompt,
        "parameters": {"decoding_method": "greedy"}
    }
    url = f"{WATSONX_BASE}/v2/text/generation?version=2024-03-15"
    r = requests.post(url, headers=HEADERS, json=payload, timeout=90)
    r.raise_for_status()
    return r.json()["results"][0]["generated_text"]

@app.post("/api/classify")
async def classify_requirement(file: UploadFile = File(...)):
    pdf_bytes = await file.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = "\n".join(page.get_text("text") for page in doc)
    prompt = f"""You are an assistant that classifies each sentence of a software requirement into its SDLC phase (Requirements, Design, Development, Testing, Deployment).
    Return result as JSON list of objects with 'sentence' and 'phase'.
    Text:
    {text}
    """
    result = await watsonx_complete(prompt)
    return {"data": result}

@app.post("/api/generate-code")
async def generate_code(req: dict):
    prompt = f"""Generate production‑ready {req.get('language', 'Python')} code for the following specification:
    {req.get('spec')}
    """
    code = await watsonx_complete(prompt)
    return {"code": code}

@app.post("/api/bug-fix")
async def bug_fix(req: dict):
    prompt = f"""Here is buggy code:
    {req.get('code')}
    Identify and fix syntax and logical errors. Return corrected code only."""
    fixed = await watsonx_complete(prompt)
    return {"fixed_code": fixed}

@app.post("/api/test-cases")
async def test_cases(req: dict):
    prompt = f"""Write unit tests using {req.get('framework','pytest')} for the following code:
    {req.get('code')}
    Return tests only."""
    tests = await watsonx_complete(prompt)
    return {"tests": tests}

@app.post("/api/summarize")
async def summarize(req: dict):
    prompt = f"""Summarize the purpose and logic of the following code:
    {req.get('code')}"""
    summary = await watsonx_complete(prompt)
    return {"summary": summary}

@app.post("/api/chat")
async def chat(req: dict):
    prompt = req.get("message", "")
    answer = await watsonx_complete(prompt)
    return {"answer": answer}
