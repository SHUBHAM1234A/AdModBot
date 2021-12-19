module.exports = {
	name: 'help',
	aliases: ['hlp' , 'cmd'],
	description: 'help command',
	execute(client, message, args, emoji, error, Discord){
		var embed = new Discord.MessageEmbed()
			.setAuthor('Help menu',client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL())
			.setColor("RANDOM")
			.setDescription(`\`=addrole\` - **Adds a existing role to a user.**
			\`=ban\` - **Bans a member from a server.**
			\`=dm\` - **DMs a server member.**
			\`=embedsay\` - **Say somthing through an embed!**
			\`=help\` - **Shows this menu.**
			\`=invite\` - **Sends the invite!**
			\`=kick\` - **Kicks a person from a server**
			\`=lock\` - **Locks a channel for all the roles**
			\`=mute\` - **Mutes a member**
			\`=nuke\` - **Deletes a channel and creates it clone**
			\`=purge\` - **Blukdeletes given number of messages**
			\`=removerole\` - **Removes a role from a user**
			\`=removeslomode\` - **Removes the slowmode**
			\`=slowmode\` - **Adds a slowmode (any value less than 6hr)**
			\`=unban\` - **Revoke the ban a banned user by their ID**
			\`=unlock\` - **Unlockes a channel for all roles**
			\`=userinfo\` - **Sends an advanced information of a user**
			\`=warn\` - **Warns a user**`)
			.setTimestamp()
			.setFooter("Made with love by PRᎾ_CᎾDΞR#9232")
		message.channel.send(embed);
	}
}