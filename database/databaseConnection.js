import {mongoose} from "mongoose";

const databaseConnection = async () => {

  const con=await mongoose.connect(process.env.MONGO_URL)
  if (con) {
    console.log("connected database");
  } else {
    console.log("not connected database");
  }
};

export default databaseConnection;
