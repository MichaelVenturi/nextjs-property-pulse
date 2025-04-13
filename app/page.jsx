import Link from "next/link";
// a next link uses href property, not "to" like react router.  You can do this two ways
// Link href="/properties?query=param" as plain text, allowing query params as well, or
// href={{
//   pathname: "properties",
//   query: { query: "param" },     as an object like this which will take you to the same place
// }}

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <Link
        href={{
          pathname: "properties",
          query: { name: "test" },
        }}>
        go to properties
      </Link>
    </div>
  );
};
export default HomePage;
