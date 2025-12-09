export type Message = {
  _id?: string;
  role: "user" | "ai";
  content: string;
  createdAt?: string;
};
