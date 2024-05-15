const express = require("express");

const app = express();

const apiRoutes = require("./routes/api.routes.js");

app.use("/", apiRoutes);

app.listen(5000, (req, res) => {
  console.log("Server is running on PORT : 5000");
});
