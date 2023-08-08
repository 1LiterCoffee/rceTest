const express = require("express");
const path = require('path');
const router = express.Router();
const moment = require("moment-timezone");
const wrap = require("express-async-wrap");
const bodyParser = require("body-parser")
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static('public'));

router.get(
  "/",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} test in`);
    const filePath = path.join(__dirname, '..', 'views', 'index.html');
    res.sendFile(filePath)
  })
);
router.post(
  "/enc",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} enc in`);
    console.log(req.body);
    const result = req.body.data;
    res.json(`${result}[enc]`)
  })
);
router.post(
  "/dec",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} dec in`);
    console.log(req.body);
    const result = req.body.data.replace(/\[enc\]/,"")
    res.json([`${result}[dec]`])
  })
);
module.exports = router;
