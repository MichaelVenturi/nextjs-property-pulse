import PropertyCard from "@/components/property/PropertyCard";
// here is where Nextjs shines:  no need for a separate backend with routes and handlers, and then having to do a useEffect in the component to hit those routes
import connectDB from "@/config/database"; // we can just import our connectDB function and the models we want to work with and use them directly in our server component
import Property from "@/models/Property"; // this is great, because personally I hate useEffect
import Pagination from "@/components/Pagination";

// as such, our server component will need to be async to use things like connectDB (client components cannot be async)
const PropertiesPage = async ({ searchParams }) => {
  // this right here is amazing.  Two lines and you just fetched all your data, right from within the component.  Eat shit, useEffect
  await connectDB();

  const { page = 1, pageSize = 6 } = await searchParams;

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSize);

  const showPagination = total > pageSize;
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
      {showPagination && <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />}
    </section>
  );
};
export default PropertiesPage;
