const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET;

const token = {
  userIdOfOne: jwt.sign({ id: 1 }, privateKey),
  userIdOfTwo: jwt.sign({ id: 2 }, privateKey),
  userIdOfThree: jwt.sign({ id: 3 }, privateKey),
  userIdOfOneHundred: jwt.sign({ id: 100 }, privateKey),
};

module.exports = { token };
