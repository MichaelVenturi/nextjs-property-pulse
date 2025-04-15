export { default } from "next-auth/middleware"; // this line by itself protects literally all routes/pages of your application

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"], // this line specifies to only protect the paths in this list
};

// and it just protects them automatically by having this middleware.js file in the root
