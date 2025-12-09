import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI!,
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
  ollamaModel: process.env.OLLAMA_MODEL ?? "gemma3",
  corsOrigin: process.env.CORS_ORIGIN,
} as const;
