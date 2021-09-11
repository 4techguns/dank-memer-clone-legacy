const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Keyv = require('keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('check ur coins'),
	async execute(interaction) {
		await interaction.deferReply();
		const keyv = new Keyv('sqlite://../botDB.sqlite');

        let embBase = new MessageEmbed()
            .setFooter('calculayshuns')
            .setTitle('coins')
            .setDescription('<a:loadin:886214245845458944> ples w8');

        await interaction.editReply({embeds: [embBase]});

        if ((await keyv.get(interaction.user.id)) < 10000) {
            await embBase.setFooter('broke 👎😹👎')
        } else {
            await embBase.setFooter('pogr 😎👌')
        }

        await interaction.editReply({embeds: [embBase]});

        await embBase.setDescription(`:yellow_circle: you have ${await keyv.get(interaction.user.id)} coins`);

		await interaction.editReply({embeds: [embBase]});
	},
};
