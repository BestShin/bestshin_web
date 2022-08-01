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

  createUserRepo: async (access_token, repo) => {
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repo,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },

  getUserRepoContents: async (access_token, owner, repo, path) => {
    let url = `https://api.github.com/repos/${owner}/${repo}/contents`;
    if (path) url += `/${path}`;

    console.log(url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  },

  createUserRepoTreeSHA: async (access_token, owner, repo, path, type, sha) => {
    // TODO: 신동준 | git Tree에 대해 R&D 하기.
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/git/trees`,
      {
        owner,
        repo,
        base_tree: sha,
        tree: [
          {
            path,
            mode: type === 'dir' ? '040000' : '100644',
            type: type === 'dir' ? 'tree' : 'blob',
            sha,
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

  getUserRepoTree: async (access_token, owner, repo, sha) => {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },

  commitAndPushRepository: async (
    access_token,
    owner,
    repo,
    path,
    message,
    committer,
    committer_email,
    content
  ) => {
    const response = await axios.put(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        owner,
        repo,
        path,
        message,
        committer: {
          name: committer,
          email: committer_email,
        },
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },

  deleteFile: async (
    access_token,
    owner,
    repo,
    path,
    message,
    committer,
    committer_email,
    sha
  ) => {
    console.log(
      access_token,
      owner,
      repo,
      path,
      message,
      committer,
      committer_email,
      sha
    );
    const response = await axios.delete(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          owner,
          repo,
          path,
          message,
          committer: {
            name: committer,
            email: committer_email,
          },
          sha,
        },
      }
    );

    return response.data;
  },

  inviteCollaborator: async (
    access_token,
    owner,
    repo,
    username,
    permission = 'admin'
  ) => {
    const response = await axios.put(
      `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
      {
        owner,
        repo,
        username,
        permission,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },

  getBranches: async (access_token, owner, repo) => {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/branches`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },

  getCommitHistories: async (
    access_token,
    owner,
    repo,
    per_page,
    page,
    sha
  ) => {
    let url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${per_page}&page=${page}'`;
    if (sha) url += `&sha=${sha}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  },

  getUserInfo: async (access_token) => {
    const response = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  },

  getUsers: async (access_token, per_page, page, name) => {
    const response = await axios.get(
      `https://api.github.com/search/users?per_page=${per_page}&page=${page}&q=${name}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  },
};
