// const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  apt: String,
  city: String,
  state: String,
  zip: Number
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  email: String,
  address: {
    type: addressSchema
  }
});

const SALT_ROUNDS = 10;

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    this.password = hash;
    next();
  } else {
    next();
  }
})

userSchema.methods.correctPassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
}

userSchema.methods.generateToken = async function() {
  try {
    const token = await jwt.sign({id: this.id}, process.env.JWT);
    return token;
  } catch (error) {
    console.error(error)
  }
}

userSchema.statics.authenticate = async function ({username, password}) {
  const user = await User.findOne({username});
  if (!user || !(await user.correctPassword(password))) {
    const error = new Error('Incorrect username/password');
    error.status = 401;
    throw error;
  } else {
    return user.generateToken();
  };
}

userSchema.statics.findByToken = async function (token) {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    if (payload) {
      const user = await User.findById(payload.id);
      return user;
    } else {
      const error = new Error('Bad credentials')
      error.status = 401;
      throw error;
    }
  } catch (error) {
    console.error(error)
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
