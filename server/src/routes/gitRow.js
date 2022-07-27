const router = require('express').Router();
const { auth } = require('../modules/jwt');
const { getUserRepoContents } = require('../apis/githubAPI');
const Gitrows = require('gitrows');

const gitrows = new Gitrows();

const path = '@github/ehdwns1516/test/data.json';

router.get('', auth, async (req, res) => {
  try {
    const response = await getUserRepoContents(
      req.data.access_token,
      'ehdwns1516',
      'test',
      'data.json'
    );
    console.log(response);
    if (response.hasOwnProperty('content')) {
      const decodedContent = Buffer.from(
        response['content'],
        response['encoding']
      ).toString('utf8');

      response['content'] = decodedContent;
    }
    return res.status(200).json({
      response,
      data: JSON.parse(response['content']),
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('', auth, async (req, res) => {
  const options = {
    username: 'ehdwns1516',
    token: req.data.access_token,
    branch: 'main',
  };

  gitrows.options(options);

  gitrows
    .put(path, req.body.data)
    .then((response) => {
      console.log(response);
      return res.status(200).json({
        response,
      });
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
});

module.exports = router;
