// for dynamic routes like this one, you can use a spread operator in the name like [...id] to make this a catch all
// meaning this page will be loaded for any extensions past the id, like /:id/name/fakeroute/lalala will still load this page
// doesnt work like this for static routes however.  That will just change the route to be /...properties

// "use client"; // this line indicates to make this a client componnet
// import { useRouter, useParams, useSearchParams } from "next/navigation"; //make sure not to import from next/router, which is for the pages directory (old way)

import connectDB from "@/config/database";
import Property from "@/models/Property";

// components
import PropertyHeaderImage from "@/components/property/PropertyHeaderImage";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyImages from "@/components/property/PropertyImages";
import PropertyContactForm from "@/components/property/PropertyContactForm";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";

import Link from "next/link";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { FaArrowLeft } from "react-icons/fa";

// in next 15, params and searchparams are async.  So on client, you need the react "use" hook
// on server, you make the component async and await params (cant make client components async)
// im not really sure what the difference is between using the hooks or not on client side.  The hooks seem to still work
const PropertyPage = async ({ params, searchParams }) => {
  await connectDB();

  const { id } = await params;
  const sp = await searchParams;

  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return <h1 className="text-center text-2xl font-bold mt-10">Property not found</h1>;
  }
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyPage;
