const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const Keyv = require('keyv');
const { emojis } = require('../util/emojis.js')
const { generate } = require('../util/rng.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('work so you can get some money'),
	async execute(interaction) {
        let rand = generate(500, 150000)
		
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('work')
					.setLabel('work')
					.setStyle('PRIMARY'),
			);

		const embed = new MessageEmbed()
				.setColor('#00ff00')
				.setTitle('shift')
				.setDescription(`${emojis.COIN} click the button below`)
				.setFooter(`you will get ${rand} coins`)

		const messag = await interaction.reply({ embeds: [embed], fetchReply: true, components: [row]})
		
		const filter = i => i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000, errors: ['time'] });
		
		let result = 0

		collector.on('collect', async i => {
			if (i.customId === 'work') {
				await i.deferUpdate();
				let keyv = new Keyv('sqlite://botDB.sqlite');
				embed.setDescription(`${emojis.LOADING} please wait!`)
				await i.editReply({ embeds: [embed], fetchReply: true, components: [row]});

				if (await keyv.get(interaction.user.id) == undefined) {
					await keyv.set(interaction.user.id, rand)
				} else {
					await keyv.set(interaction.user.id, (await keyv.get(interaction.user.id)) + rand)
				}
				row.components[0].setStyle('SUCCESS');
				row.components[0].setDisabled(true);
				embed.setDescription(`${emojis.COIN} your shift ended and your boss has paid you!`)
				embed.setFooter(`you got paid ${rand} tech coins`)
				await i.editReply({ embeds: [embed], fetchReply: true, components: [row]});
				result = 1
				await collector.stop();
			}
		});
		
		collector.on('end', async () => {
			if (result === 0) {
				row.components[0].setStyle('DANGER');
				row.components[0].setDisabled(true);
				embed.setDescription(':x: timed out...')
				embed.setFooter(`you would have gotten ${rand} coins`)
				await messag.edit({ embeds: [embed], components: [row] });
			}
		});
		

		
	},
};
