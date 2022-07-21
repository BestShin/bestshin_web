// githup api request functions
const axios = require('axios');

module.exports = {
  createAccessToken: async (client_id, client_secret, oauthCode) => {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id,
        client_secret,
        code: oauthCode,
      }
    );

    return response.data;
  },
};
