const express = require('express');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 1 requests per windowMs
});

app.use(cors());

app.use(helmet());

app.use(limiter);

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/users.routes'));

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