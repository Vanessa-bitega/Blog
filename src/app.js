import express from "express";
import mongoose from "mongoose";
import configurations from "./configs/index.js";
import allRoutes from "./routes/index.js";
import ErrorHandler from "./middlewares/error-handler.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './docs/swagger.js'; // Import as object

// Server middlewares
const app = express();
app.use(express.json());

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routes
app.use("/", allRoutes);

// Database connectivity
mongoose.connect(configurations.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Start server
app.listen(configurations.PORT, () =>
  console.log(`Server is running on port ${configurations.PORT}`)
);

// Error handling middleware
app.use(ErrorHandler);
