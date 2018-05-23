const user = require("../controllers").user;
// const twitter = require("../controllers").twitter;
const scrape = require("../controllers").scrape;
const artist = require("../controllers").artist;
const songs = require("../controllers").songs;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the User API!"
    })
  );

  // USERS
  app.post("/api/user", user.create);
  app.get("/api/user", user.list);
  app.post("/api/user/login", user.login);

  // ARTISTS
  app.post("/api/artist", artist.create);
  app.get("/api/artist", artist.list);

  // SONGS
  app.post("/api/songs", songs.create);
  app.get("/api/songs", songs.list);

  // SCRAPER
  app.post("/api/scrape", scrape.run);

  /*
  //TWITTER
  app.get("/auth/twitter", user.twitter);
  app.get("/auth/twitter/callback", user.twitterCallback);

  //TWITTER API
  app.get("/api/twitter/thread/:id", twitter.getThreadFromTweetId);
  */
};
