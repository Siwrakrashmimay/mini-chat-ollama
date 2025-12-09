# Mini Chat App with Ollama

Full-stack mini chat application:

- **Frontend:** Next.js (App Router, TypeScript)
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB
- **LLM:** Ollama (local LLM)

---

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript
- Backend: Node.js 18+, Express, TypeScript
- Database: MongoDB (local or Atlas)
- LLM Backend: Ollama (via HTTP API)

---

## Requirements

- Node.js 18+
- npm or yarn
- MongoDB running (local or cloud)
- Ollama installed and running with the `LLM` model

---

## Getting Started

### 1. Run MongoDB

```bash
mongod
```

Or use MongoDB Atlas and update `MONGODB_URI` in `env.ts`.

### 2. Run Ollama

```bash
ollama pull llama3
ollama serve
```

Ollama listens on `http://localhost:11434` by default.

---

### 3. Backend Setup (TypeScript)

```bash
npm install
npm run dev 
npm run build && npm start 
```

Backend จะรันที่ `http://localhost:4000` (ค่า default)

---

### 4. Frontend Setup (Next.js)

```bash
npm install
npm run dev
```

Frontend จะรันที่ `http://localhost:3000`.

---

## API Endpoints (Backend)

Base URL: `http://localhost:4000`

- `GET /health` – health check
- `GET /api/messages?sessionId=default` – history ของข้อความใน session
- `POST /api/messages` – ส่งข้อความ user และรับคำตอบจาก AI
- `DELETE /api/messages?sessionId=default` – ลบ history ของ session
