const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hornyrate')
		.setDescription('see how horny a person is')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the user')
                .setRequired(false)),
	async execute(interaction) {
        let user = await interaction.options.getUser('user', false);

        let rand = Math.round(Math.random() * (100 - 0) + 0);

        let bar = progressbar.filledBar(100, rand, 20, '<:grey:886361741053788240>', '<:green:886361740785377331>');

        let embBase = new MessageEmbed()
            .setFooter('helo')
            .setTitle('horny rate machine')
            .setDescription(`${rand}% horny\n${bar[0]}`);

        if (user) {
            embBase.setTitle(`horny rate machine for ${user.username}`)
        }

		await interaction.reply({embeds: [embBase]});
	},
};
