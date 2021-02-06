const {Schema, model, Types} = require('mongoose');

const MessageSchema = new Schema(
  {
    content: { type: String },
    date: { type: Date, default: Date.now},
    owner: { type: Types.ObjectId, ref: 'UserModel' },
  },
  {
    versionKey: false,
    collection: "MessageCollection"
  }
);

module.exports = model("MessageModel", MessageSchema);