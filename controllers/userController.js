const UserModel = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Something wrong. Please try again later' });
    };
};

exports.muteUser = async (req, res) => {
    try {
      const { _id } = req.body;
  
      const mutedUser = await UserModel.findOne({ _id });
      await mutedUser.updateOne({ isMuted: !mutedUser.isMuted }, { upsert: false });
  
      res.json(mutedUser);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Something wrong. Please try again later' });
    };
};

exports.banUser = async (req, res) => {
    try {
      const { _id } = req.body;
  
      const bannedUser = await UserModel.findOne({ _id });
      await bannedUser.updateOne({ isBanned: !bannedUser.isBanned }, { upsert: false });
  
      res.json(bannedUser);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Something wrong. Please try again later' });
    };
};