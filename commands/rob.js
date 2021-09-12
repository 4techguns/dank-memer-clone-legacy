const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');
const progressbar = require('string-progressbar');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rob')
		.setDescription('rob a user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('the user you want to rob')
                .setRequired(true)),
	async execute(interaction) {
        let user = await interaction.options.getMentionable('user', true);
		await interaction.deferReply();
        const keyv = new Keyv('sqlite://botDB.sqlite');

        let val = await keyv.get(user.id);

		await interaction.editReply(`<a:loadin:886214245845458944> :white_check_mark:`);

        if (user.id == interaction.user.id) {
            await interaction.editReply('don\'t try and rob yourself bruh')
        } else {
            if (await keyv.get(user.id) == undefined || await keyv.get(user.id) == 0) { await interaction.editReply('sorry that dude has no money') } else {
                await interaction.editReply(`<a:loadin:886214245845458944> - :white_check_mark: :slot_machine:`);

                let rand = Math.round(Math.random() * (val - 0) + 0);
                let bar = progressbar.filledBar(val, rand, 15, '<:grey:886361741053788240>', '<:green:886361740785377331>');
                await interaction.editReply(`<a:loadin:886214245845458944> - :white_check_mark: :slot_machine: :arrow_heading_down:`);

                await keyv.set(user.id, (await keyv.get(user.id) - rand));

                await interaction.editReply(`<a:loadin:886214245845458944> - :white_check_mark: :slot_machine: :arrow_heading_down: :moneybag:`);

                await keyv.set(interaction.user.id, (await keyv.get(interaction.user.id) + rand));

                await interaction.editReply(`you acquired :yellow_circle: ${rand} yellow circles\nyou stole this much:\n${bar[0]}\n${Math.round(bar[1])}% robbed`);
            }
        }
	},
};
