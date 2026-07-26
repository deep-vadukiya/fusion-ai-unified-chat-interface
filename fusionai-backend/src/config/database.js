//

import mongoose from "mongoose";
import env from "../config/env";

// ----------------------------------------------

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
    console.log(`📦 Database: ${connection.connection.name}`);
    console.log(`🌍 Host: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    process.exit(1);
  }
};

export default connectDatabase;
