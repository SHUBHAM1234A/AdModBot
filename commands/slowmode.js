module.exports = {
  name: "slowmode",
  aliases: ["sm", "slow", "slowmo"],
  description: "sets a slowmode.",
  execute(client, message, args, emoji, error, Discord) {
    const amount = parseInt(args[0]);
    if (
      message.member.hasPermission("MANAGE_CHANNELS") ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      if (isNaN(amount))
        return message.channel.send("It doesn't seem to be valid number");
      if (args[0] === amount + "s") {
        if (amount > 21600) {
          return message.channel.send(
            "Slowmode cannot be more than 21600 seconds(6 hours)"
          );
        } else {
          message.channel.setRateLimitPerUser(amount);
        }
        if (amount > 1) {
          message.channel.send("slowmode is now " + amount + " seconds");
          return;
        } else {
          message.channel.send("slowmode is now " + amount + " second");
          return;
        }
      }
      if (args[0] === amount + "min") {
        if (amount * 60 > 360) {
          return message.channel.send(
            "Slowmode cannot be more than 360 mins(6 hours)"
          );
        } else {
          message.channel.setRateLimitPerUser(amount * 60);
        }

        if (amount > 1) {
          message.channel.send("slowmode is now " + amount + " minutes");
          return;
        } else {
          message.channel.send("slowmode is now " + amount + " minute");

          return;
        }
      }
      if (args[0] === amount + "h") {
        if (amount * 60 * 60 > 6) {
          return message.channel.send("Slowmode cannot be more than 6 hours");
        } else {
          message.channel.setRateLimitPerUser(amount * 60 * 60);
        }
        if (amount > 1) {
          message.channel.send("slowmode is now " + amount + " hours");
          return;
        } else {
          message.channel.send("slowmode is now " + amount + " hour");
          return;
        }
      } else {
        var embed = new Discord.MessageEmbed()
          .setAuthor("Your arguments are not correct", emoji.cross)
          .setDescription(
            `__**This is how you can set a slowmode**__ :-\n\n\nYou can type like this - \`==sm [<seconds>s | <minutes>m | <hours>h]\`\n\nExample:-\n==sm 20s\n==sm 10m\n==sm 6h`
          )
          .setTimestamp()
          .setColor("#00FFFF");
        return message.channel.send(embed);
      }
    }else{
      let embed = new Discord.MessageEmbed()
        .setAuthor("User Permission Error!", emoji.cross)
        .setColor("RANDOM")
        .setDescription(
          "**Sorry, you don't have permissions to use this command!**\n\nNeeded permissions:-\n`MANAGE_CHANNEL or `ADMINISTRATOR`"
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  },
}