const express = require("express");
const router = express.Router();
const wrap = require("express-async-wrap");
const recRangking = require('../apis/recRangking')
const recRangkingKeyword = require('../apis/recRangkingKeyword')
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

  module.exports = router;