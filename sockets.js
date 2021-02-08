const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config/config');

const MessageModel = require('./models/Message');
const UserModel = require('./models/User');

function randomColor() {
  const colors = [
    'rgb(0,0,128)',
    'rgb(0,128,0)',
    'rgb(128,0,0)',
    'rgb(139,69,0)',
    'rgb(41,36,33)',
    'rgb(56,142,142)',
    'rgb(139,35,35)',
    'rgb(139,58,58)',
    'rgb(255,127,80)',
    'rgb(238,201,0)',
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  return color;
}

module.exports = io => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, config.jwt.secretOrKey);
      socket.userId = payload.id;
      next();
    } catch (err) {
      // console.log(`Socket token error: ${err.message}`)
    }
  });

  io.on("connection", async (socket) => {
    const token = socket.handshake.query.token;
    const user = await UserModel.findOne({ _id: socket.userId });
    const users = user.get("isAdmin") ? await UserModel.find() : await UserModel.find({ isOnline: true });
    
    if (!token || user.get('isBanned')) {
      socket.disconnect(true);
      console.log('Administration banned you.')
    }

    //emit data
    socket.emit('users', users);
    MessageModel.find({})
    .sort({ date: -1 })
        .limit(10)
        .sort({ date: 1 })
        .lean()
        .exec((err, messages) => {
          if (!err) {
            socket.emit("messages", messages);
          }
        });
    // socket.emit('messages', messages);

    socket.on('sendMessage', (message, callback) => {
      if (message.length > 200 || user.get("isMuted")) {
        return;
      }

      MessageModel.findOne({ name: user.get("name") }, {}, { sort: { 'date': -1 } }, function (_, post) {
        newMessage = new MessageModel({
          content: message,
          name: user.get("name"),
          color: user.get("color")
        });

        if (post) {
          const diff = (newMessage.get("date") - post.date) / 1000;

          if (diff < 15) {
            return;
          }
        }

        newMessage.save();

        io.sockets.emit('message', newMessage);
      });

      callback();
    });

    if (user.isAdmin) {
      socket.on('ban', async (userId) => {
        io.sockets.sockets.forEach((key) => {
          const targetSocket = io.sockets.sockets.get(key.id);

          if (targetSocket.userId == userId) {
            targetSocket.emit('logout');
            targetSocket.disconnect();
            console.log(`User ${key.id} disconnected!`);
          }
        });

        const bannedUser = await UserModel.findById({ _id: userId });
        UserModel.findByIdAndUpdate(userId, { isBanned: !bannedUser.get("isBanned"), isOnline: false }, () => { });
      });

      socket.on('mute', async (userId) => {
        const mutedUser = await UserModel.findById({ _id: userId });
        UserModel.findByIdAndUpdate(userId, { isMuted: !mutedUser.get("isMuted") }, () => { });
      });
    }
    socket.on('logout', userName => {
      console.log(userName)
      UserModel.findOneAndUpdate(userName, { isOnline: false }, () => { });
    });

    // socket.on('login', async user => {
    //   const { name, password } = user;
    //   console.log(name);
      
    //   const candidate = await UserModel.findOne({ name });
    //   try {
    //     if (candidate && bcrypt.compareSync(password, candidate.password)) {
    //       try {
    //         const token = jwt.sign(
    //           { id: candidate.id, admin: candidate.isAdmin, name: candidate.name },
    //           config.jwt.secretOrKey,
    //           {
    //             expiresIn: '1 day',
    //           },
    //         );

    //         io.sockets.emit('token', token);

    //         await UserModel.findOneAndUpdate({ name: candidate.name }, { isOnline: true });
    //       } catch (err) {
    //         console.log(`Error from login user ${err.message}`);
    //       };
    //     };
    //   } catch (err) {
    //     console.log(`Error from user create: ${err.message}`);
    //   };
    // });
  });
};