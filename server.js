const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
require("./src/index");

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

