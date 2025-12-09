import { Message } from "../models/Message";

export async function getMessagesBySession(sessionId: string) {
  return Message.find({ sessionId }).sort({ createdAt: 1 }).exec();
}

export async function clearMessagesBySession(sessionId: string) {
  return Message.deleteMany({ sessionId }).exec();
}

export async function createUserMessage(content: string, sessionId: string) {
  return Message.create({
    role: "user",
    content,
    sessionId,
  });
}

export async function createAIMessage(content: string, sessionId: string) {
  return Message.create({
    role: "ai",
    content,
    sessionId,
  });
}
