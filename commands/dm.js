module.exports = {
  name: "dm",
  description: "DMs a member",
  async execute(client, message, args, emoji, error, Discord) {
    if (
      !message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")
    ) {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permission: `MANAGE_CHANNELS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }

    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        `You did not mention a user, or you gave an invalid id`
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("You did not specify your message");
    try {
      await user.user.send(args.slice(1).join(" "));
      await message.channel.send(`Sent a message to ${user.user.tag}`);
    } catch (err) {
      console.log(err)
      return message.channel.send(
        "Message could not be delivered, user's DMs are closed"
      );
    }
  },
};
