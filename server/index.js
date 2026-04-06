require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://awesometodosapp-1-sugj.onrender.com/"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();