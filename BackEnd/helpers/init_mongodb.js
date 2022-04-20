const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://user:l9E8fqgKMuKlK2wr@cluster0.u7ugf.mongodb.net/ToDo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error.message);
  });



mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to Atlas");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});