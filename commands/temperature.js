const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('keyv');
const { MessageEmbed } = require('discord.js');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const { toFahrenheit } = require('celsius')

module.exports = {
        data: new SlashCommandBuilder()
                .setName('checktemp')
                .setDescription('check the server\'s temperature'),
        async execute(interaction) {
                let keyv = new Keyv('sqlite://botDB.sqlite');

                let result = await exec('cat /sys/class/thermal/thermal_zone0/temp')
		let okay = Math.round((result.stdout) / 1000);
                
                let prevtemp = await keyv.get('previoustemp');

                let prevtempFormatted = (prevtemp != null) ? `${prevtemp}` : `none stored`

                let difference;

                if (prevtemp != null) {
                        if (okay > prevtemp) {
                                difference = `🔼 warmer by ${okay - prevtemp}`
                        } else if (okay < prevtemp) {
                                difference = `🔽 colder by ${prevtemp - okay}`
                        } else if (okay === prevtemp) {
                                difference = `⏺ same temperature`
                        }
                } else {
                        difference = ``
                }

                let emb = new MessageEmbed()
                        .setTitle(':thermometer: temperature')
                        .setDescription(`${okay}° celsius
                        ${toFahrenheit(okay)}° fahrenheit
                        previous temperature: ${prevtempFormatted}`)
                        .setFooter(`${difference}`)

		await keyv.set('previoustemp', okay);

		await interaction.reply({ embeds: [emb] });
	}
};
