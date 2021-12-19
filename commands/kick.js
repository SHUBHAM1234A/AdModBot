module.exports = {
  name: "kick",
  aliases: ["k"],
  description: "Kick a member in a server",
  execute(client, message, args, emoji, error, Discord) {
    const cross =
      "https://www.facebook.com/images/emoji.php/v9/t2c/1.5/30/274c.png";
    const tick =
      "https://www.facebook.com/images/emoji.php/v9/t82/1.5/30/2705.png";
    const { member, mentions } = message;
    const reason = args.splice(1, args.length).join(" ");
    const tag = `<@${member.id}>`;
    const target = message.mentions.users.first();
    if (
      member.hasPermission("KICK_MEMBERS") ||
      member.hasPermission("ADMINISTRATOR")
    ) {
      if (target) {
        const memberTarget = message.guild.members.cache.get(target.id);
        memberTarget
          .kick({reason: reason})
          .then(() => {
            const embed = new Discord.MessageEmbed()
              .setAuthor(
                `${message.guild.name} Modlogs`,
                message.guild.iconURL()
              )
              .setColor("RANDOM")
              .setFooter(message.guild.name, message.guild.iconURL())
              .addField("**Moderation**", "Kick")
              .addField("**ID**", `${memberTarget}`)
              .addField("**Kicked By**", message.author.tag)
              .addField("**Reason**", `${reason || "**No Reason**"}`)
              .addField("**Date**", message.createdAt.toLocaleString())
              .setTimestamp();
            message.channel.send(embed);
          })
          .catch((err) => {
            var embed = new Discord.MessageEmbed();
            embed.setAuthor(`Failed to kick ${memberTarget.user.tag}`, cross);
            //embed.setThumbnail(memberTarget.user.displayAvatarURL({dynamic: true, size: 512}))
            embed.setDescription(
              `That member is an **admin** or **owner**, I am not able to do that\n\n\n Some tips (if you are an admin) :-\n\n • Give me permission to kick a member \n • Drag my role higher than the roles assigned to <@${memberTarget.user.id}> and try again\n`
            );
            embed.setTimestamp(message.createdAt);
            embed.setColor("red");
            message.channel.send(embed);
            console.error(err);
          });
      } else {
        message.reply(`❌ Please Specify a valid user to kick!`);
      }
    } else {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`KICK_MEMBERS` or `ADMINISTRATOR`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  },
};
