const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('work so you can get some money'),
	async execute(interaction) {
        let rand = Math.round(Math.random() * (100000 - 500) + 500)

		const messag = await interaction.reply({ content: `you will get <:tech_coin:888786215984320562> for waiting a split second`, fetchReply: true})
		
		let keyv = new Keyv('sqlite://botDB.sqlite');
		if (await keyv.get(interaction.user.id) == undefined) {
			await keyv.set(interaction.user.id, rand)
		} else {
			await keyv.set(interaction.user.id, (await keyv.get(interaction.user.id)) + rand)
		}
		await messag.edit(`you got paid <:tech_coin:888786215984320562> ${rand} tech coins`);
	},
};
