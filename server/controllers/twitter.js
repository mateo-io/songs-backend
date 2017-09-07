const User = require('../models').User;
const Twit = require('twit')
const sessionService = require('../config/sessionService.js');

// APPLICATION TWITTER API
var T = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  app_only_auth: true,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

module.exports = {
  getThreadFromTweetId: async (req, res) => {
    const tweetId = req.params.id;

    // Query original tweet to get the userId
    const threadRoot = await new Promise((resolve, reject) => {
      return T.get('statuses/show/:id', { id: tweetId }, function (err, data, response) {
        if (err) reject(err);
        resolve(data);
      })
    })

    const userId = threadRoot.user.id.toString();
    const userIgn = threadRoot.user.screen_name;

    // Query tweets after the original tweet has been posted.
    const timeline = await new Promise((resolve, reject) => {
      return T.get('statuses/user_timeline/:user', { user: userId, since_id: tweetId, count: 200, until: '2017-09-06', trim_user: true }, function (err, data, response) {
        if (err) reject(err);
        resolve(data);
      })
    })

    // SORTING FUNCTION
    function compare(a, b) {
      if (a.created_at < b.created_at)
        return -1;
      if (a.created_at > b.created_at)
        return 1;
      return 0;
    }

    // Exclude replies by other users.

    const tweets = timeline
    .sort(compare)
    .filter(tweet => {
      return tweet.in_reply_to_user_id_str==userId
    })

    let text = threadRoot.text;

    tweets.map(tweet => {
      text+='\n'+tweet.text
    })


    res.status(200).send({ userId: userId, tweetId: tweetId, thread: timeline })
  },
  getUserTweets(oauth, callback) {
    const ClientTwitter = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: oauth.oauth_token,
      access_token_secret: oauth.oauth_token_secret,
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    })

    return ClientTwitter.get('search/tweets', { q: 'this', count: 100 }, function (err, data, response) {
      console.log(data)
      return data;
    })
  },
};
