const {
  Artist,
} = require("../models");
const {
  compose
} = require("compose-middleware");

module.exports = {
  create(req, res) {
    const {
      name,
      country,
      genre
    } = req.body;
    return Artist.create({
        name,
        country,
        genre
      })
      .then(artists => res.status(201).send(artists))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Artist.findAll({
        include: [{
          all: true,
          nested: true
        }]
      })
      .then(artists => res.status(200).send(artists))
      .catch(error => res.status(400).send(error));
  },
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