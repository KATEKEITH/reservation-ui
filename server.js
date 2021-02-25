console.log("server.js");
const express = require("express");

// import redis from "redis";
const redis = require("redis");
// import redis from "./node_modules/redis";
// import fetch from "node-fetch";
const fetch = require("node-fetch");
const { response } = require("express");

const session = require("express-session");
const connectredis = require("connect-redis");
const { ids } = require("webpack");

const REDIS_PORT = 6379;
const PORT = 5000;

const app = express();
const RedisStroe = connectredis(session);
const client = redis.createClient(REDIS_PORT);
// const client = redis.createClient();
// console.log("client", client);
// client.set("name", "test");
// client.get("name", (err, reply) => {
//   console.log(">>>>", reply);
// });

const GIT_URL = "https://api.github.com/KATEKEITH/";

const kafka = require("kafka-node");

var Producer = kafka.Producer,
  KeyedMessage = kafka.KeyedMessage,
  Client = new kafka.KafkaClient({ kafkaHost: "18.191.224.226:9092" }),
  producer = new Producer(Client),
  km = new KeyedMessage("key", "message"),
  // cli = new Client({ kafkaHost: "18.191.224.226:9092" });

  payloads = [
    { topic: "test", messages: "hi,there", partition: 0 },
    { topic: "test", messages: ["hello2", "world2", km] },
  ];

producer.on("ready", function () {
  producer.send(payloads, function (err, data) {
    console.log(data);
  });
});

const getRepos = async (req, res, next) => {
  try {
    const { username } = req.params;
    const response = await fetch(`${GIT_URL}${username}`);
    const data = await response.json();
    const repos = data.public_repos;
    client.set(username, repos);
    res.send(genView(username, repos));
  } catch (e) {
    if (e) console.log("error: ", e);
  }
};

const genView = (username, repos) => {
  return `<h1>${username} \'s numbers of repositories are ${repos}</h1>`;
};

const getCache = (req, res, next) => {
  const { username } = req.params;
  client.get(username, (err, data) => {
    if (err) throw err;
    if (data) {
      res.send(genView(username, data));
    } else {
      next();
    }
  });
};

const getSession = (req, res, next) => {
  console.log("You Are In Get Session!");
  client.get(`sess:${req.session.id}`, (err, data) => {
    if (err) res.json({ err });
    if (data) {
      res.send(genView(req.session.username, req.session.repos));
    } else {
      next();
    }
  });
}; 

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    store: new RedisStroe({ client }),
  })
);
app.get("/:username", getSession, getRepos);
app.listen(PORT, () => console.log("server started..."));
