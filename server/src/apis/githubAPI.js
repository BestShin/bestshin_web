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

  getUserRepoContents: async (access_token, owner, repo_name, path) => {
    console.log(access_token, owner, repo_name, path);
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo_name}/contents/${path}?recursive=1`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  },

  createUserRepoTreeSHA: async (access_token, owner, repo_name, sha) => {
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo_name}/git/trees`,
      {
        owner,
        repo: repo_name,
        base_tree: sha,
        tree: [
          {
            path: '/packages',
            mode: '040000',
            type: 'dir',
            sha: sha,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },

  getUserRepoTree: async (access_token, owner, repo_name, sha) => {
    console.log('tree');
    console.log(access_token, owner, repo_name, sha);
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo_name}/git/trees/${sha}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response);
    return response.data;
  },
};
