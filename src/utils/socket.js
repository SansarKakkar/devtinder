const socket = require("socket.io");
const {Chat } = require("../models/chat");

const intializeSocket = (server) => {

  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    }
  });

  io.on("connection", (socket) => {

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName + " joined room", roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("_");

      try {
        let chatDoc = await Chat.findOne({
          participants: { $all: [userId, targetUserId] }
        });

        if (!chatDoc) {
          chatDoc = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chatDoc.messages.push({
          senderId: userId,
          text,
        });

        await chatDoc.save();

        io.to(roomId).emit("messageRecieved", { firstName, text });

      } catch (err) {
        console.log(err);
      }
    });

  });
};

module.exports = intializeSocket;