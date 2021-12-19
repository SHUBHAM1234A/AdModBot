module.exports = {
  name: "unmute",
  aliases: ["um", "unm"],
  description: "unmutes a muted members",
  async execute(client, message, args, emoji, error, Discord) {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!message.member.hasPermission("KICK_MEMBERS")){
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeed permissions:-\n`KICK_MEMBERS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
      

    if (!Member) return message.channel.send("Member not found");
    try {
      const role = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === "muted"
      );
      if (!Member.roles.cache.has(role.id)) {
        return message.channel.send(`${Member.user.tag} is **not** muted!`);
      }
      await Member.roles.remove(role);
      let embed = new Discord.MessageEmbed()
        .setAuthor(`Unmuted ${Member.user.tag}`, emoji.tick)
        .setColor("RANDOM")
        .addField("**Moderation**", "Unmute")
        .addField("**ID**", `${Member.user.id}`)
        .addField("**Unmuted By**", message.author.tag)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();
      message.channel.send(embed);
    } catch (err) {
      error(err);
    }
  },
};