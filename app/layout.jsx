import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

import { GlobalProvider } from "@/context/GlobalContext";
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
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <Navbar />
            <main className="font-display">{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};
export default mainLayout;
