const router = require('express').Router();
const { jwtauth } = require('../services/JWTAuth'); // JWT token validation check.

router.post('/token', (req, res) => {
  const auth_code = req.body.data.code;

  /* TODO 신동준 | client에서 보낸 OAuth code를 이용해서 github OAuth access_token 요청.
     access_token 요청 성공 -> jwt 토큰 생성 후 session에 jwt 토큰을 key값으로 OAuth access_token을 value로 저장.
     client에 jwt token response.
  */

  // const token = jwt.sign(
  //   {
  //     name: adminInfo.name,
  //   },
  //   SECRET_KEY,
  //   {
  //     expiresIn: '600m',
  //     issuer: 'DongJoon',
  //   }
  // );

  // return res.status(200).json({
  //   code: 200,
  //   message: 'token is issued.',
  //   token: token,
  //   name: adminInfo.name,
  // });
});

module.exports = router;
