const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "warn",
  aliases: "wn",
  description: "warns a user",
  async execute(client, message, args, emoji, error, Discord) {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permission:-\n`KICK_MEMBERS`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please Mention the person to who you want to warn - warn `@mention` `<reaosn>`"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("You can not warn bots");
    }

    if (message.author.id === user.id) {
      return dmessage.channel.send("You can not warn yourself");
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "You jerk, how can you warn the server owner? 😑"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Please provide reason to warn - warn `@mention` `<reason>`"
      );
    }
    var embed = new Discord.MessageEmbed()
      .setAuthor("Warning !!!", message.guild.iconURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL())
      .setDescription(`You have been warned in **${message.guild.name}**`)
      .addFields(
        { name: "Warning by", value: message.author.tag, inline: true },
        { name: "Reason", value: reason, inline: true }
      )
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#FF0000");
      try {
         await user.send(embed);
      } catch (error) {
        message.channel.send("Their DMs are closed! Sorry");
      }
   

    var embed2 = new Discord.MessageEmbed()
      .setAuthor(`You warned ${message.mentions.users.first().username}`, emoji.tick)
      .setThumbnail(user.user.displayAvatarURL({dynamic: true, size: 512}))
      .addFields(
        { name: "Warning by", value: message.author.tag, inline: true },
        { name: "Reason", value: reason, inline: true }
      )
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#00FF00");
    await message.channel.send(embed2);
  },
};
