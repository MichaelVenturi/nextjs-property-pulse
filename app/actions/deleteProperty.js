"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { user, userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  // verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // extract public id from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  await Property.deleteOne({ _id: propertyId });

  revalidatePath("/", "layout");
};

export default deleteProperty;
