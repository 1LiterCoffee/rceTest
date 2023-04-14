const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const wrap = require("express-async-wrap");
const recRangking = require("../apis/recRangking");
const recRangkingKeyword = require("../apis/recRangkingKeyword");
const recRangkingDetail = require("../apis/recRangkingDetail");
const recRangkingSearch = require("../apis/recRangkingSearch");
const recClass = require("../apis/recClass");
const recClassDetail = require("../apis/recClassDetail");

router.get(
  "/rangking",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} rangking in`);
    await recRangking((error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  })
);
router.get(
  "/rangkingKeyword/",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} rangkingKeyword in`);
    await recRangkingKeyword((error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  })
);
router.get(
  "/rangkingDetail/",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} rangkingDetail in`);
    let param = req.query;
    await recRangkingDetail(param.url, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  })
);
router.get(
  "/recRangkingSearch/",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} recRangkingSearch in`);
    let param = req.query;
    await recRangkingSearch(param.nm, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  })
);
router.get(
  "/recClass",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} recClass in`);
    await recClass((error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  })
);
router.get(
  "/recClassDetail",
  wrap(async function (req, res, next) {
    console.log(`${moment().format("MM-DD HH:mm:ss")} recClassDetail in`);
    let param = req.query;
    await recClassDetail(param.url, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  })
);
module.exports = router;
