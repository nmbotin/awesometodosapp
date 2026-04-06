require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");

const app = express();
app.use(express.json());

// ✅ ADD THIS HERE
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
      console.log(`Server is listening on http://localhost:5000/api/todos`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();