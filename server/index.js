import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import QRCode from "qrcode";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/clientTracking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Client Schema
const clientSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  fileNo: String,
  status: { type: String, default: "Pending" },
});

const Client = mongoose.model("Client", clientSchema);

// Register Client and Generate QR Code
app.post("/register", async (req, res) => {
  const { fname, lname, fileNo } = req.body;

  try {
    const newClient = await Client.create({ fname, lname, fileNo });
    const qrData = `http://localhost:3000/track-status?fileNo=${fileNo}`;
    const qrCode = await QRCode.toDataURL(qrData);

    res.json({ message: "Registration successful", qrCode, fileNo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering client", error: err.message });
  }
});

// Get File Status
app.get("/track-status", async (req, res) => {
  const { fileNo } = req.query;

  try {
    const clientFile = await Client.findOne({ fileNo });

    if (!clientFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({
      status: clientFile.status,
      fname: clientFile.fname,
      lname: clientFile.lname,
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
