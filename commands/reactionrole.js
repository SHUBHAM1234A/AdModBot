module.exports = {
  name: "reactionrole",
  aliases: ["rerole", "react"],
  description: "creates a reation role message in specific channel in a guild.",
  async execute(client, message, args, emoji, error, Discord) {
    const channel = "879980668598235169";
    const yellowTeamRole = message.guild.roles.cache.find(
      (role) => role.name === "Red"
    );
    const blueTeamRole = message.guild.roles.cache.find(
      (role) => role.name === "Blue"
    );

    const yellowTeamEmoji = "😑";
    const blueTeamEmoji = "😥";

    let embed = new Discord.MessageEmbed()
      .setColor("#e42643")
      .setTitle("Choose a team to play on!")
      .setDescription(
        "Choosing a team will allow you to interact with your teammates!\n\n" +
          `${yellowTeamEmoji} for yellow team\n` +
          `${blueTeamEmoji} for blue team`
      );

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(yellowTeamEmoji);
    messageEmbed.react(blueTeamEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(yellowTeamRole);
        }
        if (reaction.emoji.name === blueTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(blueTeamRole);
        }
      } else {
        return;
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(yellowTeamRole);
        }
        if (reaction.emoji.name === blueTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(blueTeamRole);
        }
      } else {
        return;
      }
    });
  },
};