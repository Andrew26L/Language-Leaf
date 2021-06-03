const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
})

module.exports = User;

User.prototype.correctPassword = function (candidatePassword) {
  const match = bcrypt.compare(candidatePassword, this.password);
  return match;
}

User.prototype.generateToken = async function() {
  try {
    const token = await jwt.sign({id: this.id}, process.env.JWT);
    return {token};
  } catch (error) {
    console.error(error)
  }
}

User.authenticate = async function ({username, password}) {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user && await user.correctPassword(password)) {
    return user.generateToken();
  } else {
    const error = new Error('Bad credentials');
    error.status = 401;
    throw error;
  };
}

User.findByToken = async function (token) {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    if (payload) {
      const user = await User.findByPk(payload.id);
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

const hashPassword = async(user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
};

