const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8090;
const apiProxy = createProxyMiddleware('/', {
    target: 'https://coginsight.zendesk.com',
    changeOrigin: true,
    pathRewrite: {
      '^/zen/': '/', // /zen/로 시작하는 경로를 /로 재작성
    }
  });
 app.use('/', require('./router'));
app.use('/zen', apiProxy);
const server = app.listen(port, () => console.log(`app listening on port ${port}!`));