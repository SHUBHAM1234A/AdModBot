module.exports = (client, Discord, message) => {
  const config = {
    token: process.env.token,
    prefix: "=",
  };
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.trim().startsWith(config.prefix)
  )
    return;
  const emoji = {
    cross: "https://www.facebook.com/images/emoji.php/v9/t2c/1.5/30/274c.png",
    tick: "https://www.facebook.com/images/emoji.php/v9/t82/1.5/30/2705.png",
  };
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  function error(err) {
    message.channel.send({ content: "Error: \n\n" + err, code: "js" });
    console.log(err);
    return;
  }
  try {
    if (command) {
      command.execute(client, message, args, emoji, error, Discord);
    }
  } catch (err) {
    console.log(err);
    error(err);
    return;
  }
};
