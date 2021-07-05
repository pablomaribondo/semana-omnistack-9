const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();

const routes = require("./routes");

const PORT = process.env.PORT || 3333;
const app = express();
const server = http.Server(app);
const io = socketio(server);

const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
mongoose.connect(MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id: userId } = socket.handshake.query;

  connectedUsers[userId] = socket.id;
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
