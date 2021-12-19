module.exports = {
  name: "purge",
  aliases: "pu",
  description: "Deletes messages from a channel",
  execute(client, message, args, emoji, error, Discord) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`MANAGE_CHANNELS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
    if (isNaN(args[0]))
      return message.channel.send(
        "**Please Supply A Valid Amount To Delete Messages!**"
      );/* kuchh bhi
       */

    if (args[0] > 100)
      return message.channel.send("**Please Supply A Number Less Than 100!**");

    if (args[0] < 1)
      return message.channel.send("**Please Supply A Number More Than 1!**");

    message.channel
      .bulkDelete(args[0])
      .then((messages) =>
        message.channel
          .send(
            `**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`
          )
          .then((msg) => msg.delete({ timeout: 5000 }))
      )
      .catch(() => null);
  },
};
