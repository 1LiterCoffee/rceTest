const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.10000recipe.com/ranking/home_new.html?dtype=m&rtype=r";

async function recRangking(callback) {
  request(url, async (error, response, html) => { 
      console.log("recRangking in");
      if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const data = [];
          const items = $('ul.common_sp_list_ul li').slice(0, 100); 
          for (let i = 0; i < items.length; i++) { 
              const item = items.eq(i);
              const title = item.find('.common_sp_caption_tit').text().trim();
              const imgSrc = item.find('.common_sp_link > img').attr('src');
              const url = "https://www.10000recipe.com"+item.find('.common_sp_thumb a').attr('href');
              data.push({title,imgSrc,url})
          }
          callback(null, data);
      } else {
          callback(error);
      }
  });
}



module.exports = recRangking;
