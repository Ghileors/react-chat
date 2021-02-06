const jwt = require('jsonwebtoken');
require("dotenv").config();

const MessageModel = require('./models/Message');
const UserModel = require('./models/User');

module.exports = io => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.userId = payload.id;
      next();
    } catch (err) {
      console.log(`error:`, err.message)
    }
  });

  io.on("connection", async (socket) => {
    const token = socket.handshake.query.token;
    const user = await UserModel.findOne({ _id: socket.userId });
    const users = user.get("isAdmin") ? await UserModel.find() : await UserModel.find({ isOnline: true });
    const messages = await MessageModel.find();

    socket.emit('users', users);

    //messages sockets
    socket.emit('messages', messages);

    socket.on('sendMessage', (message, callback) => {
      newMessage = new MessageModel({
        content: message,
        name: user.get("name"),
        color: user.get("color")
      });

      newMessage.save();

      const SendNow = Date.now(newMessage.get("date"));

      const sender = MessageModel.find({ name: user.get("name") });
      console.log(sender.model)

      if (!user.get("isMuted")) {
        io.sockets.emit('message', newMessage);
      };

      socket.emit('muteWarning');

      callback();
    });

    if (user.isAdmin) {
      socket.on('ban', (userId) => {
        UserModel.findByIdAndUpdate(userId, { isBanned: false },
          function (err, docs) {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Banned User : ", docs);
            }
          });
        // 2. find and diconnect user
      });

      socket.on('mute', (userId) => {
        UserModel.findByIdAndUpdate(userId, { isMuted: false },
          function (err, docs) {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Muted User : ", docs);
            }
          });
      });
    }

  });
}
// 1. check user by token
// socket.handshake.query.token
// if token not exists or invalid - disconnect
// 3. check for admin
// if user admin - send full users list
// if simple user - send only online users list

// 2. check user for ban and for exists in db
// if not exists or user banned - disconnect
// 1. check users, who send message for mute status
// 2. check 15sec silent (need read last message from this user from db and compare date)
// 3. check for 200 lenght