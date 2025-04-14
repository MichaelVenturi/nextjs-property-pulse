import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";

// a next link uses href property, not "to" like react router.  You can do this two ways
// Link href="/properties?query=param" as plain text, allowing query params as well, or
// href={{
//   pathname: "properties",
//   query: { query: "param" },     as an object like this which will take you to the same place
// }}

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
    </div>
  );
};
export default HomePage;

/*
SERVER SIDE VS CLIENT SIDE COMPONENTS
-server side components are less complex, the fetch data much more easily without things like useEffect
-direct access to ORMs (like mongoose)
-SEO better since metadata can be generated on the server instead of on the client
-Secret keys, things you would have in your .env, will not be exposed to the client side at all

However, server components are more static, they cant be interacted with.  You cannot use things like react hooks (useState) in them
-Hooks and any kind of user interactivity must be done in client components
-Client components can be nested into server components, it's not like an entire page must be either server side or client side
-So, depending on what a component needs to do, you decide whether to make it server or client.  Components are server side by default

Example:  You can have a property listing that fetches and lists data for a property:  that would be client side
-but in that component you may want a like button, that when the user clicks, updates the data for like count on the property
-that like button would need to be a client component, nested inside the server component
another example would be a navbar that just displays links, but maybe you want the display to change based on what link is active
-the links themselves would then be client components with active states (useState)
**Next.js docs for when to use server vs client: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

cool thing:  if you add a console.log() to a component, that log will appear:
-only on the server (your integrated terminal) if its a server component
-in the browser's console if it is a client component.  It will still appear in the terminal though since the server still sees it
*/
