module.exports = {
  name: `removerole`,
  aliases: [`rrole`, `rr`],
  description: `removes a role from a user`,
  async execute(client, message, args, emoji, error, Discord) {
    if (!message.member.hasPermission("MANAGE_ROLES")){
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`MANAGE_ROLES`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }

    const target = message.mentions.members.first();

    if (!target)
      return message.channel.send(`${emoji.cross} No member specified`);

    const role = message.mentions.roles.first();

    if (!role) return message.channel.send(`${emoji.cross} No role specified`);

    try {
      await target.roles.remove(role);
      var embed = new Discord.MessageEmbed()
        .setAuthor("Removed a role", emoji.tick)
        .setDescription(`<@${target.user.id}> lost <@&${role.id}> role.`)
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send(embed);
    } catch (err) {
        message.channel.send({ content: "Error: \n" + err, code: "js" });
    }
  },
};
