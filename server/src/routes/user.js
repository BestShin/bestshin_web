const router = require('express').Router();
const { auth } = require('../modules/jwt');
const { getUserInfo, getUsers } = require('../apis/githubAPI');

router.get('', auth, async (req, res) => {
  try {
    const response = await getUserInfo(req.data.access_token);

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/search/:per_page/:page/:name', auth, async (req, res) => {
  try {
    const response = await getUsers(
      req.data.access_token,
      req.params.per_page,
      req.params.page,
      req.params.name
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

module.exports = router;
