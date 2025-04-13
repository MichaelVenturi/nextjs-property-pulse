"use client"; // this line indicates to make this a client componnet
import { useRouter } from "next/navigation"; //make sure not to import from next/router, which is for the pages directory (old way)
const PropertiesPage = () => {
  const router = useRouter();

  console.log(router);

  return (
    <div>
      <button onClick={() => router.replace("/")}>Go home</button>
    </div>
  );
};
export default PropertiesPage;
