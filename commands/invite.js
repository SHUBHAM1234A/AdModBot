//const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "invite command",
  execute(client, message, args, emoji, error, Discord) {
    var permissionInteger = 536870911991;

    var invLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${permissionInteger}&scope=bot%20applications.commands`;
    var ADinvLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;
    var embed = new Discord.MessageEmbed()
      .setAuthor(
        `Invite ${client.user.username} to your server!`,
        client.user.displayAvatarURL()
      )
      .setDescription(
        `Invite Link:- \n \n [__**Link with all permissions**__](${invLink}) \n [__**Link with Administrator permission**__](${ADinvLink})`
      )
      .setColor("RANDOM");
    message.channel.send(embed);
    message.channel.send(`If these👆 links are not working then take these\n\n\n__**Link with all permissions**__ - ${invLink}\n__**Link with Administrator permission**__ - ${ADinvLink}`)
  },
};
