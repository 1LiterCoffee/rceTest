const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.10000recipe.com/ranking/home_new.html?dtype=m&rtype=r";

function recRangking() {
  let result = request(url, (error, response, html) => {
    let list = [];
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      $("ul.common_sp_list_ul li").each((i, el) => {
        const title = $(el).find(".common_sp_caption_tit").text().trim();
        const imgSrc = $(el).find(".common_sp_link > img").attr("src");
        list.push({ title: title, img: imgSrc });
      });
    }
    return list;
  });
  return result;
}

module.exports = recRangking;