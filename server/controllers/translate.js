const fetch = require('node-fetch');

const translateText = (req, res) => {
  const {
    text,
    target
  } = req.body

  // Imports the Google Cloud client library
  const Translate = require('@google-cloud/translate');

  // Your Google Cloud Platform project ID
  const projectId = 'master-206122';

  // Instantiates a client
  const translate = new Translate({
    projectId: projectId,
  });

  // Translates some text into Russian
  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
      res.status(200).send(translation)
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(400).send(err)
    });


}


module.exports = {
  translateText
}