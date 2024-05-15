const express = require("express");
const cors = require("cors");

const app = express();

const apiRoutes = require("./routes/api.routes.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRoutes);

app.listen(5000, (req, res) => {
  console.log("Server is running on PORT : 5000");
});
