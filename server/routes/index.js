const {
  artist,
  songs,
  lyrics,
  user,
  scrape,
  translate
} = require("../controllers")
// const twitter = controllers.twitter;

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

  // Lyrics
  app.post("/api/lyrics", lyrics.create);
  app.get("/api/lyrics", lyrics.list);
  app.post("/api/lyrics-fetch", lyrics.find)

  // TRANSLATE
  app.post("/api/translate", translate.translateText)

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