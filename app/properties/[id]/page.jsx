// for dynamic routes like this one, you can use a spread operator in the name like [...id] to make this a catch all
// meaning this page will be loaded for any extensions past the id, like /:id/name/fakeroute/lalala will still load this page
// doesnt work like this for static routes however.  That will just change the route to be /...properties
const PropertyPage = () => {
  return <div>PropertyPage</div>;
};
export default PropertyPage;
