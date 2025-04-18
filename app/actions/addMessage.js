"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

import { redirect } from "next/navigation";

// when using useActionState, it passes this previousState variable as well, before the formData
// so you might use something like useActionState instead for actions that involve modifying global state or something like that
// we wont use the previousState param for this.  this probably isnt the right use case for useActionState, but learning is learning
const addMessage = async (_previousState, formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");
  if (userId === recipient) {
    return { error: "You cannot send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });
  console.log(newMessage);

  await newMessage.save();
  return { submitted: true };
};

export default addMessage;
