const user = require("./user");
const scrape = require("./scrape");
// const twitter = require("./twitter");

// core
const artist = require("./artist");
const songs = require("./song");
const lyrics = require("./lyrics")

// extra
const translate = require("./translate")

module.exports = {
  user,
  // twitter,
  scrape,
  artist,
  songs,
  lyrics,
  translate
};