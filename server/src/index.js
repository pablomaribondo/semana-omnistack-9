const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes");

const PORT = process.env.PORT || 3333;
const app = express();

const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
mongoose.connect(MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
