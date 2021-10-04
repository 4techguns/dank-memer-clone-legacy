const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const progressbar = require('string-progressbar');
const { generate } = require('../util/rng.js');
const { emojis } = require('../util/emojis.js');
const { calcPercentageOfNumb } = require('../util/percent.js');
const { rgbToHex } = require('../util/rgbhexconversion.js');

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

        let rand = generate(0, 100);
        
        let red = 0;
        let green = 0;

        (rand < 50) ? green = calcPercentageOfNumb(rand, 255) : red = calcPercentageOfNumb(rand, 255)

        let bar = progressbar.filledBar(100, rand, 15, emojis.PROGRESS.GREY, emojis.PROGRESS.GREEN);

        let embBase = new MessageEmbed()
            .setFooter((rand > 49) ? 'horni jail *bonk*' : 'not horni :)')
            .setTitle('horny rate machine')
            .setColor(rgbToHex(red, green, 0))
            .setDescription(`${rand}% horny\n${bar[0]}`);

        if (user) {
            embBase.setTitle(`horny rate machine for ${user.username}`)
        }

		await interaction.reply({embeds: [embBase]});
	},
};
