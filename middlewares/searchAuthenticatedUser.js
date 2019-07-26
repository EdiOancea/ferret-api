const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_SECRET;
const userRepository = require('../app/repositories/user');

module.exports = (req, res, next) => {
  if (typeof req.headers.authorization !== 'string') {
    next();
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Unauthenticated user.' });
    } else {
      userRepository.get(decoded.id)
        .then(user => {
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).send({ message: 'Unauthenticated user.' });
          }
        });
    }
  });
};
