import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./Db/db.js";
import Routes from "./Routes/routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test routes
app.get('/test', (req, res) => res.json({ message: 'Server is connected!' }));
app.get('/api/test', (req, res) => res.json({ message: 'API routes working!' }));

// API routes
app.use("/api", Routes);

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected ✅");
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server ❌", err);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();
