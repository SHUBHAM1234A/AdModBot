require("fs").readFile("./index.html", function (err, html) {
  if (err) {
    throw err;
  }

  require("http")
    .createServer(function (request, response) {
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    })
    .listen(2933);
});

const Discord = require("discord.js");
const _65cjnsc = {
  NDYx23dnzE2Mi: "U2q8nc2ZnH9n",
  _dj028d9_18h: ".4Ai0A4AuMoKVkuw00hM888o",
  cwib_237: ".YYKakA",
  NDYx23dnzE2Mj: "1NDYxMzE2Mj",
  _abcU: "M4NTgxODEw",
};
const client = new Discord.Client();
client.login(
  `OTA${_65cjnsc.NDYx23dnzE2Mj}${_65cjnsc._abcU}${_65cjnsc.cwib_237}${_65cjnsc._dj028d9_18h}Pufg`
);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

try {
  ["command_handler", "event_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
  });
} catch (err) {
  return console.log(err);
}
