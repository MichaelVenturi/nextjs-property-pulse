import PropertyCard from "@/components/PropertyCard";
// here is where Nextjs shines:  no need for a separate backend with routes and handlers, and then having to do a useEffect in the component to hit those routes
import connectDB from "@/config/database"; // we can just import our connectDB function and the models we want to work with and use them directly in our server component
import Property from "@/models/Property"; // this is great, because personally I hate useEffect

// as such, our server component will need to be async to use things like connectDB (client components cannot be async)
const PropertiesPage = async () => {
  // this right here is amazing.  Two lines and you just fetched all your data, right from within the component.  Eat shit, useEffect
  await connectDB();
  // .lean() returns plain javascript objects instead of mongoose documents, optimizing performance.  This means the results will be read only though
  const properties = await Property.find({}).lean();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p, i) => (
              <PropertyCard key={i} property={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertiesPage;
