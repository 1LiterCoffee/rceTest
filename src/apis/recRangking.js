const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.10000recipe.com/ranking/home_new.html?dtype=m&rtype=r";

async function recRangking(callback) {
  request(url, async (error, response, html) => { 
      if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const data = [];
          const items = $('ul.common_sp_list_ul li').slice(0, 10); 
          for (let i = 0; i < items.length; i++) { 
              const item = items.eq(i);
              const title = item.find('.common_sp_caption_tit').text().trim();
              const imgSrc = item.find('.common_sp_link > img').attr('src');
              const url = "https://www.10000recipe.com/"+item.find('.common_sp_thumb a').attr('href');

              try {
                  const detail = await recRangkingDetail(url);
                  data.push({ ranking: i + 1, title, imgSrc, url, detail });
              } catch (error) {
                  console.error(error);
                  data.push({ ranking: i + 1, title, imgSrc, url, detail: null });
              }
          }
          callback(null, data);
      } else {
          callback(error);
      }
  });
}

async function recRangkingDetail(url) { 
  console.log("ccc");
  return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
          if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html);
              const data = [];
              $('.view_step_cont').each((i, el) => {
                  const step = $(el).find('.media-body').text().trim();
                  const imgUrl = $(el).find('div img').attr('src')
                  data.push({ step, imgUrl });
              });
              resolve(data); 
          } else {
              reject(error); 
          }
      });
  });
}

module.exports = recRangking;
