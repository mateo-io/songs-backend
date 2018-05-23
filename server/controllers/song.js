const Song = require("../models").Song;
const { compose } = require("compose-middleware");

module.exports = {
  create(req, res) {
    const { title, language, artistId } = req.body;
    console.log(`request body song: ${title}-${language}-${artistId}`);
    return Song.create({
      title,
      language,
      artistId
    })
      .then(songs => res.status(201).send(songs))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Song.findAll({
      include: [{ all: true, nested: true }]
    })
      .then(songs => res.status(200).send(songs))
      .catch(error => res.status(400).send(error));
  }
  // twitter: passport.authenticate('twitter'),
  // twitterCallback: compose([
  //   passport.authenticate('twitter', { failureRedirect: '/login' }),
  //   async(req, res) => {
  //     const session = await sessionService.getSessionBySessionID(req.sessionID)

  //     res.status(200).send({
  //       user: req.user,
  //       oauth: session['oauth:twitter']
  //     });

  //   }
  // ]),
};
