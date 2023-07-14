const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

app.use('/', require('./src/router'));
const filePath = path.join(__dirname,'/src','/list');
console.log(filePath);
app.use(express.static(filePath));
const server = app.listen(port, () => console.log(`app listening on port ${port}!`));

