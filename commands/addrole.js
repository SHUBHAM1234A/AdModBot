module.exports = {
  name: "addrole",
  aliases: "ar",
  description: "adds a role to a user",
  async execute(client, message, args, emoji, error, Discord) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
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
      return message.channel.send("Mention a user to asign them a role!");
    const role = message.mentions.roles.first();
    if (!role)
      return message.channel.send(
        "Mention a role that has to be assigned to a user!"
      );
    try {
      await target.roles.add(role);
      var embed = new Discord.MessageEmbed()
        .setAuthor("Added a role", emoji.tick)
        .setDescription(`<@${target.user.id}> obtained <@&${role.id}> role.`)
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send(embed);
    } catch (err) {
      error(err);
    }
  },
};
