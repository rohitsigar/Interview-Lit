import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const database = () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("error in conncting to database", err);
    });
  } catch (error) {
    console.log(error);
  }
};

export default database;
