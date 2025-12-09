import { Schema, model, InferSchemaType } from "mongoose";

export type Role = "user" | "ai";

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      // maxlength: 500,
    },
    sessionId: {
      type: String,
      default: "default",
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export type IMessage = InferSchemaType<typeof messageSchema>;

export const Message = model<IMessage>("Message", messageSchema);
