module.exports = {
  name: "nuke",
  description:
    "deletes the channel where command is executed and clones a new one",
  async execute(client, message, args, emoji, error, Discord) {
    const { member, mentions } = message;
    const tag = `<@${member.id}`;
    const target = message.mentions.users.first();
    if (
      member.hasPermission("MANAGE_CHANNELS") ||
      member.hasPermission("ADMINISTRATOR")
    ) {
      let reason = args.join(" ") || "No Reason";
      if (!message.channel.deletable) {
        return message.reply("This channel cannot be nuked!");
      }
      try {
        let newchannel = await message.channel.clone();
        await message.channel.delete();
        let embed = new Discord.MessageEmbed()
          .setTitle("Channel Nuked")
          .setDescription(reason)
          .setImage(
            "https://i.pinimg.com/originals/6a/42/37/6a423717673288e9fddfd8e7f1389df9.gif"
          )
          .setColor("#00FFFF");
        await newchannel.send(embed);
      } catch (err) {
        error(err);
        message.channel.send("You have the permissions but i do not have");
      }
    } else {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`ADMINISTRATOR` or `MANNAGE_CHANNEL`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  },
};
