const request = require("request");
const cheerio = require("cheerio");

async function recRangkingDetail(url, callback) {
  request(url, (error, response, html) => {
    console.log('detail in');
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const data = [];
      $(".view_step_cont").each((i, el) => {
        const step = $(el).find(".media-body").text().trim();
        const imgUrl = $(el).find("div img").attr("src");
        data.push({ step, imgUrl });
      });
      $(".cont_ingre2 .ready_ingre3 ul").each((i, el) => {
        const nm = $(el).find("li a").text().trim();
        const ea = $(el).find("li span").text().trim();
        data.push({ nm, ea });
      });
      console.log(data);
      callback(null, data);
    } else {
      callback(error);
    }
  });
}
module.exports = recRangkingDetail;
