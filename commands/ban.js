module.exports = {
  name: "ban",
  aliases: ["b"],
  description: "Bans a member in a server",
  execute(client, message, args, emoji, error, Discord) {
    const { member, mentions } = message;
    const tag = `<@${member.id}`;
    const target = message.mentions.users.first();
    if (
      member.hasPermission("BAN_MEMBERS") ||
      member.hasPermission("ADMINISTRATOR")
    ) {
      if (target) {
        const reason = args.splice(1, args.length).join(" ");
        const memberTarget = message.guild.members.cache.get(target.id);
        memberTarget
          .ban({ reason: reason })
          .then(() => {
            const embed = new Discord.MessageEmbed()
              .setAuthor(
                `${message.guild.name} Modlogs`,
                message.guild.iconURL()
              )
              .setColor("RANDOM")
              .setFooter(message.guild.name, message.guild.iconURL())
              .addField("**Moderation**", "ban")
              .addField("**ID**", `${target}`)
              .addField("**Banned By**", message.author.tag)
              .addField("**Reason**", `${reason || "**No Reason**"}`)
              .addField("**Date**", message.createdAt.toLocaleString())
              .setTimestamp();
            message.channel.send(embed);
          })
          .catch((err) => {
            var embed = new Discord.MessageEmbed();
            embed.setAuthor(
              `Failed to ban ${memberTarget.user.tag}`,
              emoji.cross
            );
            //embed.setThumbnail(memberTarget.user.displayAvatarURL({dynamic: true, size: 512}))
            embed.setDescription(
              `That member is an **admin** or **owner**, I am not able to do that\n\n\n Some tips:-\n\n • Give me permission to ban a member \n • Drag my role higher than the roles assigned to <@${memberTarget.user.id}> and try again\n`
            );
            embed.setTimestamp(message.createdAt);
            embed.setColor("red");
            message.channel.send(embed);
            console.error(err);
          });
      } else {
        message.reply(`❌ Please Specify a valid user to ban!`);
      }
    } else {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permission:-\n`ADMINISTRATOR` or `BAN_MEMBERS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  },
};
