import { createApp } from "./app";
import { connectDatabase } from "./config/database";
import { config } from "./config/env";

async function bootstrap() {
  await connectDatabase();

  const app = createApp();

  app.listen(config.port, () => {
    console.log(`🚀 Backend listening on http://localhost:${config.port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
