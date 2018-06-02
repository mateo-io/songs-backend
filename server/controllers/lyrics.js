const {
  Song,
  Lyrics,
  Artist
} = require("../models");
const {
  compose
} = require("compose-middleware");

module.exports = {
  create(req, res) {
    const {
      content,
      language,
      fetchedFrom,
      songId
    } = req.body;
    console.log(`request body lyrics: ${content}-${language}-${fetchedFrom}`);
    return Lyrics.create({
        content,
        language,
        fetchedFrom,
        songId
      })
      .then(lyrics => res.status(201).send(lyrics))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Lyrics.findAll({
        // include: [{
        //   all: true,
        //   nested: true
        // }]
      })
      .then(lyrics => res.status(200).send(lyrics))
      .catch(error => res.status(400).send(error));
  },
  // MEAT OF ALL
  find(req, res) {
    const {
      artistName,
      songTitle,
      language
    } = req.body;
    return Artist.findOrCreate({
        where: {
          name: artistName
        },
        defaults: {
          name: artistName
        },
      })
      .then(artistArray => {
        // if no songs -> create song
        const artist = artistArray[0]
        const {
          songs,
          id
        } = artist
        return Song.findOrCreate({
          where: {
            title: songTitle,
            artistId: id,
            language: language
          },
        })
      })
      .then(songArray => {
        console.log(`songArray ${JSON.stringify(songArray[0])}`)
        const song = songArray[0]

        return Lyrics.findAll({
            where: {
              language: song.language,
              songId: song.id
            }
          })
          .then(lyrics => {
            if (lyrics[0]) {
              return {
                found: true,
                lyrics: lyrics[0]
              }
            } else {
              return {
                found: false,
                song: song
              }
            }
          })

      })
      .then(response => res.status(201).send(response))
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