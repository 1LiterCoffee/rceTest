const request = require("request");
const cheerio = require("cheerio");

const url = 'https://www.10000recipe.com/ranking/home_new.html?rtype=k&dtype=m';

async function recRangkingKeyword(callback) {
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const data = [];
        $('ul.goods_best3_1 li').each((i, el) => {
          const keyword = $(el).find('.best_cont a').text().trim();
          data.push({rangking:i+1,keyword:keyword});
        });
        callback(null, data);
      } else {
        callback(error);
      }
    });
  }
module.exports = recRangkingKeyword;


