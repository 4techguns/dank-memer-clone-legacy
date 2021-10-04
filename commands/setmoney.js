const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');
const { emojis } = require('../util/emojis.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setmoney')
		.setDescription('BOT OWNER ONLY: set money for a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the user')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('money')
                .setDescription('the money to set')
                .setRequired(true)),
	async execute(interaction) {
        if (interaction.user.id == '752617663888359444' || interaction.user.id == '881115333316972584') {
            let user = interaction.options.getUser('user')
            let integer = interaction.options.getInteger('money')

            await interaction.reply({ content: `${emojis.LOADING} loading`, fetchReply: true})
            
            let keyv = new Keyv('sqlite://botDB.sqlite');
            
            await keyv.set(user.id, integer);

            await interaction.editReply(`saved ${integer} to ${user.username}'s balance`);
        } else {
            await interaction.reply('owner only')
        }
	},
};
