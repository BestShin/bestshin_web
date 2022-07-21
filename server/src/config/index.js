const dotenv = require('dotenv');
dotenv.config();

export default {
  JWT: {
    secret_key: process.env.JWT_SECRET_KEY,
  },
  OAuth: {
    client_id: process.env.OAuth_client_id,
    client_secret: process.env.OAuth_client_secret,
  },
};
