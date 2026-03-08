const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form data

// Routes
const userRoutes = require("./routes/user.js");

// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(
  "./nodejs-server-server-generated/api/openapi.yaml",
);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Db store listening on port ${PORT}`);
});
