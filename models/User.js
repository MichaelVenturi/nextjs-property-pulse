import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: {
      bookmarks: [
        {
          type: Schema.Types.ObjectId,
          ref: "Property",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// With express, our server and mongoose instance will usually be instantiated once.  All modules are loaded once for the given node.js instance,  So we can always just set this line to create the schema
// However, Next is designed for running on Vercel, which has no server environment:  thats why previous apps I did that were deployed to Vercel were frontend only
// because of that, all backend code runs in serverless/cloud functions.  Next will re-evaluate modules when needed.
// Ex:  you make a change to a route, it doesn't restart the app like nodemon would, just reloads that module.  Because of this, mongoose's models cache persists and it remembers the models that were created
// In other words, this mongoose instance can be instantiated more than once, and it will raise an error if it tries recreating an existing model
const User = models.User || model("User", UserSchema);

export default User;
