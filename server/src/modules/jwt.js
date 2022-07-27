const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  auth: (req, res, next) => {
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

      req.data = {
        access_token: decoded.access_token,
      };
      return next();
    });
  },

  sign: (access_token, scope, token_type) => {
    return jwt.sign(
      {
        access_token,
        scope,
        token_type,
      },
      config.JWT.secret_key,
      {
        expiresIn: 60 * 24 * 14 + 'm',
        issuer: 'MUG_server',
      }
    );
  },
};

exports.sign;
