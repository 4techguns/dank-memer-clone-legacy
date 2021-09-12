const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Keyv = require('keyv');
const progressbar = require('string-progressbar');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('check ur coins')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('the user you want to view their coins on')
                .setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply();

        let user = await interaction.options.getMentionable('user', false);

        let bruh = ``;

        const keyv = new Keyv('sqlite://../botDB.sqlite');

        let getthing = (!user)
        ? await keyv.get(interaction.user.id)
        : await keyv.get(user.id);

        if (getthing == undefined) {
            getthing = 0
        }

        let bar = progressbar.filledBar(5000000, getthing, 15, '<:grey:886361741053788240>', '<:green:886361740785377331>');

        let embBase = new MessageEmbed()
            .setFooter('calculayshuns')
            .setTitle('coins')
            .setDescription('<a:loadin:886214245845458944>');

        await interaction.editReply({embeds: [embBase]});

        if (bar[1] >= 100) {
            bruh = `***FULLY COMPLETED***`
        } else {
            bruh = `${bar[0]}\n${Math.round(bar[1])}% complete`;
        }

        if ((getthing) < 30000 || (getthing) == undefined) {
            await embBase.setFooter(`broke 👎😹👎`)
        } else {
            await embBase.setFooter(`pogr 😎👌`)
        }

        if ((getthing) > 1000000) {
            await embBase.setFooter(`rich! 💸😏`)
        }

        if ((getthing) > 2000000) {
            await embBase.setFooter(`pogr rich 🤑😎`)
        }

        if ((getthing) > 3000000) {
            await embBase.setFooter(`very pogr rich 💰😱`)
        }

        if ((getthing) > 4000000) {
            await embBase.setFooter(`super pogr rich 💰💪`)
        }

        if ((getthing) > 5000000) {
            await embBase.setFooter(`omega pogr rich 💪💰🥶 (MAX LEVEL)`)
        }

        await interaction.editReply({embeds: [embBase]});

        await embBase.setDescription(`:yellow_circle: ${getthing}\n\nroad to max level:\n${bruh}`);

		await interaction.editReply({embeds: [embBase]});
	},
};
