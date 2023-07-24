const express = require("express");
const path = require('path');
const router = express.Router();
const moment = require("moment-timezone");
const wrap = require("express-async-wrap");
router.use(express.static('public'));

router.get(
  "/",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} test in`);
    const filePath = path.join(__dirname, '..', 'views', 'index.html');
    res.sendFile(filePath)
  })
);

module.exports = router;
