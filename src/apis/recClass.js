const request = require("request");
const cheerio = require("cheerio");

const url = 'https://www.10000recipe.com/class/home.html';

async function recClass(callback) {
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const data = [];
        $('ul.common_sp_list_ul li').each((i, el) => {
          const link = $(el).find('.common_sp_thumb a').attr('href')
          const imgUrl = $(el).find('.common_sp_thumb a img').attr('src')
          const title = $(el).find('.common_sp_caption_tit').text().trim();
          const disPer = $(el).find('.common_sp_caption_price_box .common_sp_caption_per').text().trim();
          const disPrice = $(el).find('.common_sp_caption_price_box .common_sp_caption_price').text().trim();
          const oriPrice = $(el).find('.common_sp_caption_price_box .common_sp_caption_pre').text().trim();
          data.push({rangking:i+1,link,title,imgUrl,disPer,disPrice,oriPrice});
        });
        callback(null, data);
      } else {
        callback(error);
      }
    });
  }
module.exports = recClass;


