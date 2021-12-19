module.exports = {
  name: "lock",
  aliases: "l",
  description: "locks a channel for all the roles in a guild",
  execute(client, message, args, emoji, error, Discord) {
    if (!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")) {
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription("**You don't have permissions to use this command!**\n\nNeeded permissions:-\n `MANAGE_CHANNELS`")
        .setTimestamp();
      return message.channel.send(embed);
    }

    let channel = message.channel;

    try {
      message.guild.roles.cache.forEach((role) => {
        channel.createOverwrite(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
      let embed = new Discord.MessageEmbed()
        .setAuthor("Done!", emoji.tick)
        .setDescription(
          `**Done**, channel Locked! \n\n • Now the members cannot send message in <#${message.channel.id}>\n• Members who have ADMINISTRATOR permission can send messages (like me)\n• Type \`=unl\`to unlock <#${message.channel.id}> (if you wanna to)`
        )
        .setColor("#00FF00")
        .setTimestamp();
      message.channel.send(embed);
    } catch (e) {
      error(e)
    }
    
    //message.channel.send(`<a:yes:865963544380964864> Done | Channel Locked!`);
  },
};
