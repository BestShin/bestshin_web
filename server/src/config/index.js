const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  JWT: {
    secret_key: process.env.JWT_SECRET_KEY,
  },
  OAuth: {
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
  },
};
