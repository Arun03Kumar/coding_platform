const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");

const app = express();
const httpServer = createServer(app);

const redisCache = new Redis();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5500",
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
    conspole.log("Connection ID for user", userId, "is", connId);
    socket.emit("connectionId", connId);
  });
});

app.post("sendPayload", async (req, res) => {
  const { userId, payload } = req.body;
  if(!userId || !payload) {
    return res.status(400).send("User ID and payload are required");
  } 
  const socketId = await redisCache.get(userId);
  if(socketId) {
    io.to(socketId).emit("submissionPayloadResponse", payload);
    return res.status(200).send("Payload sent successfully");
  }
  else {
    return res.status(404).send("User not connected");
  }
})

httpServer.listen(3000);
