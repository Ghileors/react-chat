const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    content: { type: String },
    date: { type: Date, default: Date.now },
    name: { type: String },
    color: { type: String }
  },
  {
    versionKey: false,
    collection: "MessageCollection"
  }
);

module.exports = model("MessageModel", MessageSchema);