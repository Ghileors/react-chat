const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const mongoose = require('mongoose'); 

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/users.routes'));
app.use('/chat', require('./routes/users.routes'));
app.use('/chat/mute', require('./routes/users.routes'));
app.use('/chat/ban', require('./routes/users.routes'));
app.use('/chat/messages', require('./routes/messages.routes'));

const PORT = config.port || 5050;

async function start() {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);
    server.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`),
    );
  } catch (err) {
    console.log('Server Error', err.message);
    process.exit(1);
  };
};

start();

require("./sockets")(io);