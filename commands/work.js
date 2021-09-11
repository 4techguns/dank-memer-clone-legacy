const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('work so you can get some money'),
	async execute(interaction) {
		await interaction.deferReply();
		const keyv = new Keyv('sqlite://../botDB.sqlite');
        let rand = Math.round(Math.random() * (10000 - 5000) + 5000)
		await interaction.editReply(`
            you got ${rand} coins\n\n<a:loadin:886214245845458944> saving...
        `);

		if (await keyv.get(interaction.user.id) == undefined) {
			await keyv.set(interaction.user.id, rand)
		} else {
			await keyv.set(interaction.user.id, (await keyv.get(interaction.user.id)) + rand)
		}

		await interaction.editReply(`
            you got ${rand} coins\n\n:white_check_mark: saved ${await keyv.get(interaction.user.id)} coins
        `);
	},
};
