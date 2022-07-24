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
  createUserRepo: async (access_token, repo_name) => {
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repo_name,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },
};
