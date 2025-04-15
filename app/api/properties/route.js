// practice only:  API routes are what they sound like, and used to be best practice for next.  You dont have to use them with Next's app router:  you can make requests in the server components like I did
// when using api routes, they follow the same file-based naming convention as pages, so api/properties/route is the route for the api/properties endpoint

import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async () => {
  // if I go to http://localhost:3000/api/properties, I see hello world
  // from there we can use this GET function in something like a useEffect
  /* return new Response(JSON.stringify({ message: "hello world" }), { status: 200 }); */
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(properties, { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

// any other http requests you want for this route, you define as a function the same as GET.  Then in the component you could use something like axios or fetch api to ping this route
