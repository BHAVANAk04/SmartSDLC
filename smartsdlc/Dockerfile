# Build frontend
FROM node:20-alpine AS builder
WORKDIR /frontend
COPY smartsdlc/frontend/package*.json ./
RUN npm install
COPY smartsdlc/frontend ./
RUN npm run build

# Build backend
FROM python:3.11-slim
WORKDIR /app
COPY smartsdlc/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY smartsdlc/backend /app
COPY --from=builder /frontend/dist /app/static
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
