const router = require('express').Router();
const { auth } = require('../modules/jwt');
const {
  createUserRepo,
  getUserRepoContents,
  getUserRepoTree,
  createUserRepoTreeSHA,
} = require('../apis/githubAPI');

router.post('', auth, async (req, res) => {
  try {
    const response = await createUserRepo(
      req.data.access_token,
      req.body.repo_name
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/:owner/:repo_name/contents/:path', auth, async (req, res) => {
  try {
    const response = await getUserRepoContents(
      req.data.access_token,
      req.params.owner,
      req.params.repo_name,
      req.params.path
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.post('/:owner/:repo_name/git/trees', auth, async (req, res) => {
  try {
    const response = await createUserRepoTreeSHA(
      req.data.access_token,
      req.params.owner,
      req.params.repo_name,
      req.body.sha
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/:owner/:repo_name/git/trees/:sha', auth, async (req, res) => {
  try {
    const response = await getUserRepoTree(
      req.data.access_token,
      req.params.owner,
      req.params.repo_name,
      req.params.sha
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

module.exports = router;
