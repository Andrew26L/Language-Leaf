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
  const user = await this.findOne({
    where: {
      username
    },
  });
  if (!user || !(await user.correctPassword(password))) {
    const error = new Error('Incorrect username/password');
    error.status = 401;
    throw error;
  } else {
    return user.generateToken();
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

const hashPassword = (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

User.beforeSave(async (user) => {
  user.password = await hashPassword(user.password)
});

module.exports = User;
