const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const RedisStore = require("connect-redis")(session);
const redisStore = new RedisStore({ client: redisClient });
const cors = require("cors");

// TODO configure sess
require("dotenv").config();
require("./initializers/passport");
require("./config/config.js");
const sessionConfig = {
  secret: "the pig is on the bath",
  key: "sid",
  cookie: { secure: false },
  resave: true,
  saveUninitialized: true,
  store: redisStore
};

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.set("trust proxy", 1);
// TODO secure cookie in production?
app.use(cookieParser("the pig is on the bath"));
app.use(session(sessionConfig));

// STORE
const sessionService = require("./config/sessionService.js");
sessionService.initializeRedis(redisClient, redisStore);

app.use(cors());

// Require our routes into the application.
require("./routes")(app);

/* graphql */
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    allArtists: [Artist!]
  }
  type Artist {
    name: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  allArtists: () => {
    return [{name:'Ray'}, {name:'dude'}];
  },
  artist: () => {
    return [{name:'Ray'}]
  }
};
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
/* graphql END*/

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

module.exports = app;
