const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Keyv = require('keyv');
const progressbar = require('string-progressbar');
const { emojis } = require('../util/emojis.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('check ur coins')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the user you want to view their coins on')
                .setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply();

        let user = await interaction.options.getUser('user', false);

        let bruh = ``;

        const keyv = new Keyv('sqlite://botDB.sqlite');

        let getthing = (!user)
        ? await keyv.get(interaction.user.id)
        : await keyv.get(user.id);

        if (getthing == undefined) {
            getthing = 0
        }

        let bar = progressbar.filledBar(5000000, getthing, 15, emojis.PROGRESS.GREY, emojis.PROGRESS.GREEN);

        let embBase = new MessageEmbed()
            .setFooter('----- ---')
            .setDescription(`${emojis.COIN} 0\nroad to max level:\n--------------------\n--% completed`);

        (user)
        ? embBase.setTitle(`balance for ${user.username}`)
        : embBase.setTitle(`your balance`)

        await interaction.editReply({embeds: [embBase]});

        if (bar[1] >= 100) {
            bruh = ``
        } else {
            bruh = `\n\nroad to max level:\n${bar[0]}\n${Math.round(bar[1])}% complete`;
        }

        if ((getthing) < 30000 || (getthing) == undefined) {
            await embBase.setFooter(`broke 👎😹👎`)
        } else {
            await embBase.setFooter(`level 1 □`)
        }

        if ((getthing) > 1000000) {
            await embBase.setFooter(`level 2 ▤`)
        }

        if ((getthing) > 2000000) {
            await embBase.setFooter(`level 3 ▥`)
        }

        if ((getthing) > 3000000) {
            await embBase.setFooter(`level 4 ▧`)
        }

        if ((getthing) > 4000000) {
            await embBase.setFooter(`level 5 ▩`)
        }

        if ((getthing) > 5000000) {
            await embBase.setFooter(`level 6 ◼ (MAX LEVEL)`)
        }

        if ((getthing) > 100000000000000) {
            await embBase.setFooter(`level 7 ◈ (hax!!!!!)`)
        }

        await embBase.setDescription(`${emojis.COIN} ${getthing} tech coins${bruh}`);

		await interaction.editReply({embeds: [embBase]});
	},
};
