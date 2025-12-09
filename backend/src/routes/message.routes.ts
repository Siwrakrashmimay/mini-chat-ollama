import { Router } from "express";
import {
  getMessagesHandler,
  clearMessagesHandler,
  postMessageHandler,
} from "../controllers/message.controller";

const router = Router();

router.get("/", getMessagesHandler);
router.delete("/", clearMessagesHandler);
router.post("/", postMessageHandler);

export default router;
