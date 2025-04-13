import "@/assets/styles/globals.css";
// favicon is alo loaded in automatically, just by having a file called "favicon.ico" placed in the app folder

// this metadata is automatically loaded in just by exporting it here in the layout
export const metadata = {
  title: "Property Pulse",
  // key words rendered on server instead of on the client, improving SEO
  // (search engine optimization, search engines can find these keywords more easily)
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const mainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main className="font-display">{children}</main>
      </body>
    </html>
  );
};
export default mainLayout;
