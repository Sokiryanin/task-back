import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST } = process.env;
console.log(DB_HOST);
mongoose
  .connect(
    "mongodb+srv://oldLocman:Ekau4jwf7UZUPT8e@cluster0.jzgqpwa.mongodb.net/my-boards?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


