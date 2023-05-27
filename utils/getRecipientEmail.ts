import { Conversation } from "../types";
import { User } from "firebase/auth";

export const getRecipientEmail = (
  conversation: Conversation["users"],
  loggedInUser?: User | null
) => {
  return conversation.find((userEmail) => userEmail !== loggedInUser?.email);
};
