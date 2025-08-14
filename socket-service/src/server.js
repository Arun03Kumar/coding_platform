const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:4000", "http://localhost:5500"],
    methods: ["GET", "POST"],
}));

const redisCache = new Redis();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4000", "http://localhost:5500"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("setUserId", (userId) => {
    redisCache.set(userId, socket.id);
  });

  socket.on("getConnectionId", (userId) => {
    const connId = redisCache.get(userId);
    console.log("Connection ID for user", userId, "is", connId);
    socket.emit("connectionId", connId);
  });
});

app.post("/sendPayload", async (req, res) => {
  console.log("Received payload:", req.body);
  const { userId, payload } = req.body;
  if (!userId || !payload) {
    return res.status(400).send("User ID and payload are required");
  }
  const socketId = await redisCache.get(userId);
  if (socketId) {
    io.to(socketId).emit("submissionPayloadResponse", payload);
    console.log("Payload sent", payload);
    return res.status(200).send("Payload sent successfully");
  } else {
    return res.status(404).send("User not connected");
  }
});

httpServer.listen(3005, () => {
  console.log("Socket server is running on port 3005");
});
