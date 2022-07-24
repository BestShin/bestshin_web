const router = require('express').Router();
const { auth } = require('../modules/jwt');
const { createUserRepo } = require('../apis/githubAPI');

router.post('', auth, async (req, res) => {
  console.log(req.data);
  try {
    const response = await createUserRepo(req.data.access_token, req.data.name);
    console.log(response);
    return res.status(200).json({
      code: 200,
      message: 'create repository success.',
    });
  } catch (error) {
    console.log(error.response.data.message);
    return res.status(401).json({
      code: 401,
      message: error.response.data.message,
    });
  }
});

module.exports = router;
