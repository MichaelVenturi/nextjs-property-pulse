"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// cant be an arrow function, since we are going to use "bind" with this and that is only a method for normal functions
async function updateProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    // when throwing an error, it will open error.jsx, once again a page that will automatically show up where it needs to so long as we name it and place it correctly
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser; // this will be the mongo _id for the user currently logged in

  const existingProperty = await Property.findById(propertyId);
  // verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }
  const amenities = formData.getAll("amenities"); //these tags come from the name property for the input fields in the form
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);
  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
