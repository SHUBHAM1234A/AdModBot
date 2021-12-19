module.exports = {
  name: "removeslowmode",
  aliases: ["rsm", "removesm", "removeslowmo"],
  description: "removes a slowmode form chanenl",
  execute(client, message, args, emoji, error, Discord) {
    if (
      message.member.hasPermission("MANAGE_CHANNELS") ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      message.channel.setRateLimitPerUser(0);
      message.channel.send("Slowmode removed!");
    }else{
        let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`MANAGE_CHANNEL` or `ADMINISTRATOR`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  },
};
