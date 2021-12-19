var pattern = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

module.exports = {
  name: "embedsay",
  aliases: ["es", "embed"],
  description: "embed say",
  execute(client, message, args, emoji, error, Discord) {
    message.delete();

    let Content = args.join(" ");

    if (!Content)
      return message.channel.send(`Please Give Me Something To Say!`);

    function UrlCheck(str) {
      return pattern.test(str);
    }

    /*if (UrlCheck(Content) === true) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(
          `Links are not allowed. Only Administrators can use links!`
        );
      }
    }*/

    let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setColor("#00FFFF")
      .setDescription(`${Content}`)
      .setTimestamp();

    return message.channel.send(embed);
  },
};
