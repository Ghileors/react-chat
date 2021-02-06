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
      console.log(err.message)
    }
  });

  io.on("connection", async (socket) => {
    const token = socket.handshake.query.token;

    const user = await UserModel.findOne({ _id: socket.userId });

    socket.on("join", () => {
      console.log(`User ${user} connected`); // socket
    });

    const messages = await MessageModel.find();
    socket.emit('messages', messages);

    const users = await UserModel.find();
    socket.emit('users', users);

    socket.on('sendMessage', (message, callback) => {
      message = new MessageModel();

      io.emit('message', { user, message });

      callback();
    });
  });
}

  // io.on('connection', async (socket) => {
  //   console.log(`New connection!`);

  //   // 1. check user by token 
  //   // socket.handshake.query.token
  //   // if token not exists or invalid - disconnect
  //   const token = socket.handshake.query.token;
  //   const validToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   socket.userId = validToken.id;

  //   if (!validToken) {
  //     socket.emit('invalidAccessToken', function(data) {
  //       console.log(data);
  //       socket.disconnect(true);
  //     });
  //   };

  //   // 3. check for admin
  //   // if user admin - send full users list
  //   // if simple user - send only online users list

  //   // <-- current user
  //   const user = await UserModel.findOne({ _id: socket.userId });

  //   // 2. check user for ban and for exists in db
  //   // if not exists or user banned - disconnect
  //   if (!user || user.isBanned) {
  //     socket.on("disconnect", () => {
  //       console.log(`Disconnected!`);
  //     });
  //   };

  //   const users = await UserModel.find();
  //   socket.emit('listUsers', users);

  //   socket.on('message', data => {
  //     console.log(data);

  //     // 1. check users, who send message for mute status
  //     // 2. check 15sec silent (need read last message from this user from db and compare date)
  //     // 3. check for 200 lenght

  //     // send message for all
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('User had left!')
  //   })

  //   // add events listeners only if current users - admin
  //   if (user.isAdmin){
  //     socket.on('ban', data => {
  //       console.log(data);
  //       // 1. ban user by id
  //       // 2. find and diconnect user
  //     });

  //     socket.on('unban', data => {
  //       console.log(data);
  //       // 1. unban user by id
  //     });

  //     socket.on('mute', data => {
  //       console.log(data);
  //       // 1. mute user by id
  //     });

  //     socket.on('unmute', data => {
  //       console.log(data);
  //       // 1. unmute user by id
  //     });
  //   }
  // });
