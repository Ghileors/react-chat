const { Schema, model, Types } = require('mongoose');
const bcrtypt = require('bcryptjs');

const UsersSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    isOnline: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    isMuted: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    color: { type: String },
    addedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    collection: 'UsersCollection',
  },
);

UsersSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew()) {
    this.password = bcrtypt.hashSync(this.password, 12);
  }
  next();
});

module.exports = model('UserModel', UsersSchema);
