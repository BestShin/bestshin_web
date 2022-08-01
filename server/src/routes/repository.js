const router = require('express').Router();
const { auth } = require('../modules/jwt');
const {
  createUserRepo,
  getUserRepoContents,
  getUserRepoTree,
  createUserRepoTreeSHA,
  commitAndPushRepository,
  getBranches,
  getCommitHistories,
  inviteCollaborator,
  deleteFile,
} = require('../apis/githubAPI');

router.post('', auth, async (req, res) => {
  try {
    const response = await createUserRepo(req.data.access_token, req.body.repo);

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/:owner/:repo/contents/:path', auth, async (req, res) => {
  try {
    const response = await getUserRepoContents(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.params.path // TODO: Front | path가 '/' 일 때 빈스트링으로 넘겨주기
    );

    if (response.hasOwnProperty('content')) {
      const decodedContent = Buffer.from(
        response['content'],
        response['encoding']
      ).toString('utf8');

      response['content'] = decodedContent;
    }
    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/:owner/:repo/contents', auth, async (req, res) => {
  try {
    const response = await getUserRepoContents(
      req.data.access_token,
      req.params.owner,
      req.params.repo
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.post('/:owner/:repo/git/trees', auth, async (req, res) => {
  try {
    const response = await createUserRepoTreeSHA(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.body.path,
      req.body.type,
      req.body.sha
    );
    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/:owner/:repo/git/trees/:sha', auth, async (req, res) => {
  try {
    const response = await getUserRepoTree(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.params.sha
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.put('/:owner/:repo/contents/:path', auth, async (req, res) => {
  try {
    const base64EncodedContents = Buffer.from(
      req.body.contents,
      'utf8'
    ).toString('base64');

    const response = await commitAndPushRepository(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.params.path,
      req.body.message,
      req.body.committer,
      req.body.committer_email,
      base64EncodedContents
    );
    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.delete('/:owner/:repo/contents/:path', auth, async (req, res) => {
  try {
    const response = await deleteFile(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.params.path,
      req.body.message,
      req.body.committer,
      req.body.committer_email,
      req.body.sha
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.put('/:owner/:repo/collaborators/:username', auth, async (req, res) => {
  try {
    const response = await inviteCollaborator(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.params.username,
      req.body.permission
    );
    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

router.get('/:owner/:repo/branches', auth, async (req, res) => {
  try {
    const response = await getBranches(
      req.data.access_token,
      req.params.owner,
      req.params.repo
    );

    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(error.response.status).send(error);
  }
});

router.get(
  '/:owner/:repo/commits/:per_page/:page/:branch_sha',
  auth,
  async (req, res) => {
    try {
      const response = await getCommitHistories(
        req.data.access_token,
        req.params.owner,
        req.params.repo,
        req.params.per_page,
        req.params.page,
        req.params.branch_sha
      );

      return res.send(response);
    } catch (error) {
      return res.status(error.response.status).send(error);
    }
  }
);

router.get('/:owner/:repo/commits/:per_page/:page', auth, async (req, res) => {
  try {
    const response = await getCommitHistories(
      req.data.access_token,
      req.params.owner,
      req.params.repo,
      req.params.per_page,
      req.params.page
    );

    return res.send(response);
  } catch (error) {
    return res.status(error.response.status).send(error);
  }
});

module.exports = router;
