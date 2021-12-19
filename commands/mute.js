module.exports = {
  name: "mute",
  aliases: ["mu"],
  description: "mute a user",
  async execute(client, message, args, emoji, error, Discord) {
    if (!message.member.hasPermission("KICK_MEMBERS")){
        let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`KICK_MEMBERS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!Member) return message.channel.send("Member is not found.");

    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );

    if (!role) {
      try {
        let muterole = await message.guild.roles.create({
          data: {
            name: "muted",
            permissions: [],
          },
        });
        message.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
        message.channel.send(
          "Your server was not having a 'muted' role so, I created one for your server."
        );
      } catch (err) {
        error(err)
      }
    }
    let role2 = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );
    role2.setColor("#292B2F")
    if (Member.roles.cache.has(role2.id))
      return message.channel.send(
        `${Member.displayName} has already been muted.`
      );
    await Member.roles.add(role2);
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Muted ${Member.user.tag}`, emoji.tick)
        .setColor("RANDOM")
        .addField("**Moderation**", "Mute")
        .addField("**ID**", `${Member.user.id}`)
        .addField("**Muted By**", message.author.tag)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();
    message.channel.send(embed);
  },
};