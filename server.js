const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: ".env" });

const ApiError = require("./utils/ApiError");
const globelError = require("./middlewares/errorMiddlware");
const dbconnect = require("./config/database");
const ann = require("./modules/announcement/annRouter");
const cors = require("cors");
const quiz = require("./modules/quiz/quizRouter");
dbconnect();

// Create express app
const app = express();
app.use(cors());
// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Temporary route to check it's working
app.get("/", (req, res) => {
  res.send("Using dotenv!");
});
app.use("/api/announcements", ann);
app.use("/api/quiz", quiz);

// Global error handler
app.use(globelError);

// Start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Run app on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Server shutdown...`);
    process.exit(1);
  });
});
