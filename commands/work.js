const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('work so you can get some money'),
	async execute(interaction) {
		await interaction.deferReply();
		const keyv = new Keyv('sqlite://botDB.sqlite');
        let rand = Math.round(Math.random() * (100000 - 500) + 500)
		await interaction.editReply(`
            <a:loadin:886214245845458944> ------ -> :moneybag:
        `);

		if (await keyv.get(interaction.user.id) == undefined) {
			await keyv.set(interaction.user.id, rand)
		} else {
			await keyv.set(interaction.user.id, (await keyv.get(interaction.user.id)) + rand)
		}

		await interaction.editReply(`
			:yellow_circle: ${rand} -> :moneybag:
        `);
	},
};
