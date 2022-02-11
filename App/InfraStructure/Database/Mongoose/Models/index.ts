import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});
export default db;
