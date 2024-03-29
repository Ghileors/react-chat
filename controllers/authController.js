const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');

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

exports.login = async (req, res) => {
  const { name, password } = req.body;

  if (name.length < 3) throw "Name must be atleast 3 characters long.";
  if (password.length < 3) throw "Password must be atleast 3 characters long.";

  const isAdmin = await UserModel.find();

  if (!isAdmin.length) {
    try {
      const admin = new UserModel({
        name,
        password,
        isAdmin: true,
        color: randomColor(),
      });

      await admin.save();

      const token = jwt.sign(
        { id: admin.id, admin: admin.isAdmin, name: admin.name },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      res.json({ token });
      return res.status(201).json({ message: 'Admin created' });

    } catch (err) {
      console.log(err.message);
    }
  };

  const candidate = await UserModel.findOne({ name });
  try {
    if (!candidate) {
      const user = new UserModel({
        name,
        password,
        color: randomColor(),
      });

      await user.save();

      const token = jwt.sign(
        { id: user.id, admin: user.isAdmin, name: user.name },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );

      res.json({ token });
      return res.status(201).json({ message: 'User created' });
    };

    if (candidate.isBanned) {
      try {
        return res.status(401).send({ message: 'Administration banned you.' });
      } catch (err) {
        console.log(err.message);
      };
    };

    if (candidate && !bcrypt.compareSync(password, candidate.password)) {
      try {
        return res.status(404).send({ message: 'Wrong login or password.' });
      } catch (err) { };

    };

    if (candidate && bcrypt.compareSync(password, candidate.password)) {
      try {
        const token = jwt.sign(
          { id: candidate.id, admin: candidate.isAdmin, name: candidate.name },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );
        res.json({ token });
        return res.status(200).send({ message: 'User login success.' });
      } catch (err) { }
    };
  } catch (err) {
    console.log(err.message);
  };
};

exports.post = async (req, res) => {
  res.status(200).send({ message: 'Logout success.' });
};

