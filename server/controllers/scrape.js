const puppeteer = require("puppeteer");

const getLyricsUrl = async page => {
  // selectors
  const FIRST_LINK_SELECTOR0 = `body > div.container.main-page > div > div > div > table > tbody > tr > td > a`;
  const FIRST_LINK_SELECTOR1 = `body > div.container.main-page > div > div > div > table > tbody > tr:nth-child(2) > td > a`;
  const FIRST_LINK_SELECTOR2 = `body > div.container.main-page > div > div > div > table > tbody > tr:nth-child(1) > td > a`;

  const lyricsSelectors = [
    FIRST_LINK_SELECTOR0,
    FIRST_LINK_SELECTOR1,
    FIRST_LINK_SELECTOR2
  ];

  // go to first link of the search results
  const lyricsUrls = await Promise.all(
    lyricsSelectors.map(selector => {
      return page
        .evaluate(sel => {
          return document.querySelector(sel).getAttribute("href");
        }, selector)
        .then(link => {
          if (link.slice(0, 5) === "https") {
            return link;
          } else {
            return "";
          }
        });
    })
  );

  console.warn(`dude i'm at lyrics urls ${lyricsUrls}`);
  return lyricsUrls.filter(arr => arr.length > 0);
};

async function runScraper(query, language) {
  console.log(`runScraper starts with query:${query} and language ${language}`);
  if (!query || !language) {
    // if any are are empty then do nothing
    return;
  }
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  const LYRICS_SELECTOR = `body > div.container.main-page > div > div.col-xs-12.col-lg-8.text-center > div:nth-child(8)`;

  // azlyrics searches like this master+of+puppets
  const formattedQuery = query.split(" ").join("+");
  // search
  await page.goto(`https://search.azlyrics.com/search.php?q=${formattedQuery}`);

  const foundLyricsUrl = await getLyricsUrl(page);
  console.log(`foundLyrics!!! ${foundLyricsUrl}`);

  await page.goto(foundLyricsUrl[0]);

  let lyrics;
  try {
    lyrics = await page.$eval(LYRICS_SELECTOR, el => el.innerHTML);
  } catch (e) {
    console.error(`Error in getting lyrics: ${e}`);
  }

  console.log(`lyrics content is ${lyrics}`);

  browser.close();
  return lyrics;
}

module.exports = {
  run(req, res) {
    const { query, language } = req.body;
    return runScraper(query, language)
      .then(lyrics =>
        res.status(201).send({
          payload: lyrics
        })
      )
      .catch(error => res.status(400).send({ status: "400", message: error }));
  }
};