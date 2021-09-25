const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');
const progressbar = require('string-progressbar');
const { cooldownmsgs } = require("../robCooldownMsgs.json");
const cooldownUsers = new Set();

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
        

        if (cooldownUsers.has(interaction.user.id)) {
            let randomthing = Math.round(Math.random() * ((cooldownmsgs.length - 1) - 0) + 0)
            let messageshit = cooldownmsgs[randomthing];
            await interaction.reply({content: `you are on cooldown\n\n${messageshit}\n${randomthing}/${cooldownmsgs.length - 1}`});
        } else {
            await interaction.deferReply();
            cooldownUsers.add(interaction.user.id);

            const keyv = new Keyv('sqlite://botDB.sqlite');

            let val = await keyv.get(user.id);

            setTimeout(() => {
                cooldownUsers.delete(interaction.user.id);
            }, 20000);

            await interaction.editReply(`<a:loadin:886214245845458944> - robin this person`);

            if (user.id == interaction.user.id) {
                await interaction.editReply('don\'t try and rob yourself bruh\nthis is due to potential exploits')
            } else {
                if (await keyv.get(user.id) == undefined || await keyv.get(user.id) == 0) { await interaction.editReply('sorry that dude has no money') } else {
                    let rand = Math.round(Math.random() * (val - 0) + 0);
                    let bar = progressbar.filledBar(val, rand, 15, '<:grey:886361741053788240>', '<:green:886361740785377331>');

                    await keyv.set(user.id, (await keyv.get(user.id) - rand));

                    await keyv.set(interaction.user.id, (await keyv.get(interaction.user.id) + rand));

                    await interaction.editReply(`you acquired <:tech_coin:888786215984320562> ${rand} tech coins\n${bar[0]}\n${Math.round(bar[1])}% robbed`);
                }
            }
        }
	},
};
