import express from "express";
import cors from "cors";
import { config } from "./config/env";
import messageRoutes from "./routes/message.routes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: config.corsOrigin ? config.corsOrigin.split(",") : "*",
    })
  );

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/messages", messageRoutes);

  return app;
}
