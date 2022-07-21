const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// const OAuthRouter = require('./routes/OAuth');
const healthCheckRouter = require('./routes/healthCheck');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api/oauth', OAuthRouter);
app.use('/healthz', healthCheckRouter);

app.listen(port, function () {
  console.log('server on! ' + port);
});
