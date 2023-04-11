const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use('/', require('./src/router'));
const server = app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

