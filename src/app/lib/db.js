const mongoose = require("mongoose");

const connection = {};

export const connect = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using Existing Connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connection Successful");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default connect;