const router = require('express').Router();
const { URLSearchParams } = require('url');
const config = require('../config');
const githubAPI = require('../apis/githubAPI');
const { sign } = require('../modules/jwt'); // JWT token validation check.

router.post('/token', async (req, res) => {
  const { oauthCode } = req.body;

  const response = await githubAPI.createAccessToken(
    config.OAuth.client_id,
    config.OAuth.client_secret,
    oauthCode
  );

  let params = new URLSearchParams(response);

  if (params.has('access_token')) {
    const token = sign(
      params.get('access_token'),
      params.get('scope'),
      params.get('token_type')
    );

    return res.status(200).json({
      code: 200,
      message: 'JWT token is issued.',
      token,
    });
  } else {
    return res.status(401).json({
      code: 401,
      message: params.get('error_description'),
    });
  }
});

module.exports = router;
