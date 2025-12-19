import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./Db/db.js";
import Routes from "./Routes/routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Server is connected!' })
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'API routes working!' })
})

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});