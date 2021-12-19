module.exports = {
  name: "unlock",
  aliases: "unl",
  description: "unlocks a locked channel",
  execute(client, message, args, emoji, error, Discord) {
    if (!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")) {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:- `MANAGE_CHANNELS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }

    let channel = message.channel;

    try {
      message.guild.roles.cache.forEach((role) => {
        channel.createOverwrite(role, {
          SEND_MESSAGES: true,
          ADD_REACTIONS: true,
        });
      });
    } catch (e) {
      message.channel.send({ content: "Error: \n" + e, code: "js" });
      return console.log(e);
    }

    let embed = new Discord.MessageEmbed()
      .setAuthor("Done!", emoji.tick)
      .setDescription(
        `**Done**, channel Unlocked! \n\n • Now the members can send message in <#${message.channel.id}>\n• Type \`=l\`to lock <#${message.channel.id}> (if you wanna to)`
      )
      .setColor("#00FF00")
      .setTimestamp();
    message.channel.send(embed);
  },
};
