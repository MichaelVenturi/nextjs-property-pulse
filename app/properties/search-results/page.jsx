import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import PropertyCard from "@/components/property/PropertyCard";
import PropertySearchForm from "@/components/property/PropertySearchForm";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;
  await connectDB();

  const locationPattern = new RegExp(location, "i"); // i flag: case insensitive
  let query = {
    // query object for mongoose
    $or: [
      // this property lets you query for multiple fields in the model.  So it will match all these fields to the value passed
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern; // here we are querying for just the type field, so we pass it to the query directly
  }
  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default SearchResultsPage;
