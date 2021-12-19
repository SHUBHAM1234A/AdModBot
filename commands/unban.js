module.exports = {
  name: "unban",
  aliases: "ub",
  description: "unbans a banned user",
  async execute(client, message, args, emoji, error, Discord) {
    const { member, mentions } = message;
    const tag = `<@${member.id}`;
    if ( member.hasPermission("BAN_MEMBERS") || member.hasPermission("ADMINISTRATOR")){
      if (!args[0]) return message.channel.send(`Please specify a **user's ID** to unban!`);
      try {
        const user = await message.channel.guild.members.unban(args[0]);
        return message.channel.send(
          `${user.tag} was unbanned`
        );
      } catch (err) {
        message.channel.send({ content: "Error: \n" + err, code: "js" });
      }
    }else{
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`BAN_MEMBERS` or `ADMINISTRATOR`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  },
};
