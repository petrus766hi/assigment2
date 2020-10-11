const jwt = require ('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json ({msg: 'Token Invalid'});
  }

  try {
    const decode = jwt.verify (token, 'jwtSecret');
    req.user = decode.user;
    next ();
  } catch (err) {
    res.status (401).json ({msg: 'Token anda tidak valid'});
  }
};
