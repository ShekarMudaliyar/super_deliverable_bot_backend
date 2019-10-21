const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { WebClient } = require("@slack/web-api");
const { IncomingWebhook } = require("@slack/webhook");

const app = express();
dotenv.config();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const port = process.env.PORT || 4500;

app.get("/", (req, res) => {
  // Read a url from the environment variables
  const url = process.env.SLACK_WEBHOOK_URL;

  // Initialize
  const webhook = new IncomingWebhook(url);
  // Send the notification
  (async () => {
    await webhook.send({
      text: "> Hello World!!"
    });
  })();
});
app.post("/sendDaily", (req, res) => {});
app.post("/sendWeekly", (req, res) => {});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
