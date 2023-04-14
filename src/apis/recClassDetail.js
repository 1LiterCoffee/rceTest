const request = require("request");
const cheerio = require("cheerio");

async function recRangkingKeyword(url,callback) {
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const data = [];
        $('div.col-xs-9').each((i, el) => {
          const imgUrl = $(el).find('.view2_pic .centeredcrop > img').attr('src')
          const title = $(el).find('.view2_summary h3').text().trim();
          const subTitle = $(el).find('.view2_summary .view2_summary_in').text().trim();
          const dc = $(el).find('.view2_summary .price_box .dc').text().trim();
          const price = $(el).find('.view2_summary .price_box .price').text().trim();
          const del = $(el).find('.view2_summary .price_box .del').text().trim();
          const time = $(el).find('.view2_summary .view2_summary_info .info_delivery:nth-child(1) dd').text().trim();
          const date = $(el).find('.view2_summary .view2_summary_info .info_delivery:nth-child(2) dd').text().trim();
          const videoUrl = $(el).find('iframe').attr('src')
          data.push({imgUrl,title,subTitle,dc,price,del,time,date,videoUrl});
        });
        callback(null, data);
      } else {
        callback(error);
      }
    });
  }
module.exports = recRangkingKeyword;


