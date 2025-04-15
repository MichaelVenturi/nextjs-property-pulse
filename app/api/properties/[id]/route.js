import connectDB from "@/config/database";
import Property from "@/models/Property";

// get one property by id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Property not found", { status: 404 });
    return new Response(property, { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

// to then use an api route like this, you would simply do it how you might do it in a normal react component
// you would need useEffect, so the component would need to have 'use client" at the top
// and just do something like
/* useEffect(() => {
    const res = await fetch('/api/properties/:id')
},[])
*/
// however, this kind of defeats the purpose of nextjs.  Why do this when you can just directly fetch your data from inside a server component?
// A reason you might want to make api routes like this is if you are creating a mobile app on react native or something, and you want it to be able to do all the same things as your next app
// then that mobile app could just hit the api routes you set up in the next app.  But if it is just the next app, you dont really need to create api routes
// basically, api routes in next are only useful if you plan on hitting those routes from outside the nextjs application
