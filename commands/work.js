const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('work so you can get some money'),
	async execute(interaction) {
        let rand = Math.round(Math.random() * (10000 - 5000) + 5000)
		await interaction.reply(`
            ***DISCLAIMER: THIS COMMAND IS A TEST IT DOESNT ACTUALLY DO MUCH OTHER THAN GIVE YOU A RANDOM NUMBER***
            you got ${rand} coins
        `);
	},
};
