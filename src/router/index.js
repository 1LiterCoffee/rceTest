const express = require("express");
const router = express.Router();
const wrap = require("express-async-wrap");
const recRangking = require('../apis/recRangking')
const recRangkingKeyword = require('../apis/recRangkingKeyword')
const recRangkingDetail = require('../apis/recRangkingDetail')
const recRangkingSearch = require('../apis/recRangkingSearch')
router.get(
    "/rangking",
    wrap(async function (req, res, next) {
        await recRangking((error, data) => {
            if (error) {
                res.send(error)
            } else {
                console.log(data.length);
              res.send(data)
            }
          });
    })
  );
  router.get(
    "/rangkingKeyword/",
    wrap(async function (req, res, next) {
        console.log('fdsaf');
        await recRangkingKeyword((error, data) => {
            if (error) {
                res.send(error)
            } else {
                console.log(data.length);
              res.send(data)
            }
          });
    })
  );
  router.get(
    "/rangkingDetail/",
    wrap(async function (req, res, next) {
        console.log('detail in');
        let param = req.query;
        await recRangkingDetail(param.url,(error, data) => {
            if (error) {
                res.send(error)
            } else {
                console.log(data.length);
              res.send(data)
            }
          });
    })
  );
  router.get(
    "/recRangkingSearch/",
    wrap(async function (req, res, next) {
        console.log('recRangkingSearch in');
        let param = req.query;
        await recRangkingSearch(param.nm,(error, data) => {
            if (error) {
                res.send(error)
            } else {
                console.log(data.length);
              res.send(data)
            }
          });
    })
  );   

  module.exports = router;