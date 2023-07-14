const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const apiProxy = createProxyMiddleware('/', {
    target: 'https://coginsight.zendesk.com',
    changeOrigin: true
  });
app.use('/', require('./src/router'));
app.use('/api', apiProxy);
const filePath = path.join(__dirname,'/src','/list');
console.log(filePath);
app.use(express.static(filePath));
const server = app.listen(port, () => console.log(`app listening on port ${port}!`));

