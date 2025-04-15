// this is a server action, we must specify that with:
"use server";
// server actions are asynchronous functions that are executed on the server.  you can use them in server or client components.
// you would use these for handling form submissions, and it is much easier than having each input manually change a piece of state and then the onSubmit function pulling from that
// instead, this server action will get all the values from the input fields in the form

// since these are ran on the server, notice that any console logs will only appear in the terminal, not on the browser

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache"; // once we submit, updates the cache and the listings so what we just added will show up
import { redirect } from "next/navigation";

// this action gets applied right to the form tag and will be triggered on submit
// server actions use the POST method.  Notice that when this action runs, the terminal will say POST followed by the URL it occurred from (POST /properties/add)
const addProperty = async (formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    // when throwing an error, it will open error.jsx, once again a page that will automatically show up where it needs to so long as we name it and place it correctly
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser; // this will be the mongo _id for the user currently logged in

  // format data
  // access all values from amenities
  const amenities = formData.getAll("amenities"); //these tags come from the name property for the input fields in the form
  // access all values from images
  const images = formData
    .getAll("images") // get all image objects
    .filter((image) => image.name !== "") // filter out images without a name
    .map((image) => image.name); // return an array of just the image names

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
    images,
  };

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
