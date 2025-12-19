import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
   try {
      mongoose.connect(process.env.MONGODB_URL)
      console.log("Database has been connected ✅");
   } catch (err) {
      console.error("Database connection error ❌:", err);
      process.exit(1); // Exit the process if DB connection fails
   }
};

export default connectDb;
