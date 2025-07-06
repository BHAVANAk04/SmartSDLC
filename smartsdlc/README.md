# SmartSDLC

An AI‑enhanced SDLC platform that turns natural‑language requirements into code, tests & documentation.

## Features

1. **Requirement Upload & Classification** – Upload PDFs; each sentence classified into SDLC phase.
2. **AI Code Generator** – Generate production‑ready code from plain‑text prompts.
3. **Bug Fixer** – Paste buggy code, get an optimized version.
4. **Test‑Case Generator** – Auto‑generate tests with `pytest`/`unittest`.
5. **Code Summarizer** – Human‑readable explanations of any code.
6. **Floating Chatbot** – Ask SDLC questions in natural language.

## Local setup

```bash
# backend
cd smartsdlc/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your Watsonx creds
uvicorn app:app --reload
```

```bash
# frontend (another terminal)
cd smartsdlc/frontend
npm install
npm run dev
```

## One‑click container build

```bash
docker build -t smartsdlc .
docker run -p 8000:8000 -e WATSONX_API_KEY=... smartsdlc
```

## Deploy to IBM Cloud Code Engine

1. `ibmcloud login`
2. `ibmcloud ce project select --name <your‑project>`
3. Build & push container to IBM Container Registry:

   ```bash
   ibmcloud cr region-set us-south
   ibmcloud cr login
   docker build -t us.icr.io/<namespace>/smartsdlc:latest .
   docker push us.icr.io/<namespace>/smartsdlc:latest
   ```

4. Create secrets for Watsonx credentials:

   ```bash
   ibmcloud ce secret create --name watsonx-credentials --from-literal api_key=<key> --from-literal project_id=<project>
   ```

5. Deploy app:

   ```bash
   ibmcloud ce app create --name smartsdlc --image us.icr.io/<namespace>/smartsdlc:latest --registry-secret <registry-secret> --secret watsonx-credentials --cpu 1 --memory 2G --min-scale 0 --max-scale 5 --port 8000
   ```

Access the generated URL and start using SmartSDLC!

## Required Tools

| Layer       | Tool                         | Purpose                            |
|-------------|------------------------------|------------------------------------|
| Backend     | **Python 3.11**, FastAPI     | REST API & orchestration           |
| NLP / Gen‑AI| **IBM Watsonx Granite‑20B**  | Text generation & classification   |
| PDF parse   | PyMuPDF (`fitz`)             | Extract text from PDFs             |
| Frontend    | **React + Vite**            | SPA interface                      |
| Styling     | (optional) Tailwind CSS      | Utility‑first design               |
| Container   | **Docker**                   | Build & ship app                   |
| DevOps      | **IBM Cloud Code Engine**    | Serverless container hosting       |
| CLI         | `ibmcloud`, `ibmcloud ce`    | Deploy & manage resources          |

## Next Steps

* Replace stub `watsonx_complete` with IBM Watsonx SDK or invoke your own custom micro‑prompting chain.
* Add authentication & role‑based access.
* Persist history & artifacts to a database (e.g. IBM Cloud Databases for PostgreSQL).
* Expand test‑case generator to achieve coverage metrics.
