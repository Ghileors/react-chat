const MessageModel = require('../models/Message');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find();
    res.json(messages);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: 'Something wrong. Please try again later' });
  };
};

exports.createMessages = async (req, res) => {
  const { content } = req.body;
  try {
    if (!content) {
      return res.status(400).json({ message: 'Enter Message' });
    }
    const msg = new MessageModel({
      content,
    });
    await msg.save();
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({ message: 'Something wrong. Please try again later' });
  };
};