const request = require("request");
const cheerio = require("cheerio");

const baseUrl = 'https://www.10000recipe.com/recipe/list.html';

async function recRangkingSearch(nm,callback) {
    const options = {
        url: baseUrl,
        qs: {
          q: nm
        }
      };
    request(options, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const data = [];
        console.log($('ul.common_sp_list_ul li').length);
        $('ul.common_sp_list_ul li').each((i, el) => {
          const url = "https://www.10000recipe.com"+$(el).find('.common_sp_thumb a').attr('href')
          const title = $(el).find('.common_sp_caption_tit').text().trim();
          const imgUrl = $(el).find('.common_sp_thumb a > img').attr('src')
          data.push({rangking:i+1,url,title,imgUrl});
        });
        console.log(data);
        callback(null, data);
      } else {
        callback(error);
      }
    });
  }
module.exports = recRangkingSearch;


