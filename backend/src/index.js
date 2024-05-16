require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const apiRoutes = require("./routes/api.routes.js");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT : ${PORT}`);
});
