const jwt = require('jsonwebtoken');
import config from '../config';

exports.auth = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token;

  if (!token)
    return res.status(403).json({
      code: 403,
      message: 'not logged in.',
    });

  jwt.verify(token, config.JWT.secret_key, (err, decoded) => {
    if (err)
      return res.status(401).json({
        code: 401,
        message: `validation failed. error: ${err}`,
      });

    return next();
  });
};
