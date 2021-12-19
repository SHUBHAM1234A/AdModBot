module.exports = (client, message, Discord) => {
  console.log(`logged in as ${client.user.tag}`);
  client.user.setPresence({
    activity: { name: `=help`, type: "WATCHING" },
  });
};
