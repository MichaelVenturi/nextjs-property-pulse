// for dynamic routes like this one, you can use a spread operator in the name like [...id] to make this a catch all
// meaning this page will be loaded for any extensions past the id, like /:id/name/fakeroute/lalala will still load this page
// doesnt work like this for static routes however.  That will just change the route to be /...properties

// "use client"; // this line indicates to make this a client componnet
// import { useRouter, useParams, useSearchParams } from "next/navigation"; //make sure not to import from next/router, which is for the pages directory (old way)

// in next 15, params and searchparams are async.  So on client, you need the react "use" hook
// on server, you make the component async and await params (cant make client components async)
// im not really sure what the difference is between using the hooks or not on client side.  The hooks seem to still work
const PropertyPage = async ({ params, searchParams }) => {
  const p = await params;
  const sp = await searchParams;
  return (
    <div>
      <div>
        {p.id} and {sp.name}
      </div>
    </div>
  );
};
export default PropertyPage;
