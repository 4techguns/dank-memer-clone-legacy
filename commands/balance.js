const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Keyv = require('keyv');

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

        const keyv = new Keyv('sqlite://../botDB.sqlite');

        let getthing = (!user)
        ? await keyv.get(interaction.user.id)
        : await keyv.get(user.id);

        let embBase = new MessageEmbed()
            .setFooter('calculayshuns')
            .setTitle('coins')
            .setDescription('<a:loadin:886214245845458944>');

        await interaction.editReply({embeds: [embBase]});

        if ((getthing) < 30000 || (getthing) == undefined) {
            await embBase.setFooter('broke 👎😹👎')
        } else {
            await embBase.setFooter('pogr 😎👌')
        }

        await interaction.editReply({embeds: [embBase]});

        await embBase.setDescription(`:yellow_circle: ${getthing}`);

		await interaction.editReply({embeds: [embBase]});
	},
};
