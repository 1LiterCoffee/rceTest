const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.10000recipe.com/recipe/6868260';

request(url, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    $('.view_step_cont').each((i, el) => {
        const step = $(el).find('.media-body').text().trim();
        
        // src 속성이 아닌 다른 속성도 출력하여 확인
        const style = $(el).find('div img').attr('src')

        console.log(style);
        console.log(`Step ${i + 1}: ${step}`);
      });
  }
});