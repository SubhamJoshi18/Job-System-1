import mongoose from "mongoose";

const startDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
  mongoose.connection.on("connected", () => {
    console.log("Database is connecting........");
  });

  mongoose.connection.on("error", () => {
    console.log("Database has Caught an Error");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database has been Disconnected");
  });
};

export default startDB;
