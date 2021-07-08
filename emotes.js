const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojis',
    description: 'A list of emojis of current guild',
    userperms: ['BOT_OWNER'],
    botperms: [],
    run: async (message) => {
        const embed = new MessageEmbed()
            .setColor('RED')

        let emojis = await message.guild.emojis.cache.array();

        let names = [];
        let ids = [];
        emojis.forEach(emote => {
            names.push(`\`${emote.name}\``);
            ids.push(`\`${emote.id}\``);
        });

        embed
            .addField('Names', names.join('\n'), true)
            .addField('ID', ids.join('\n'), true)
            .setTitle('Emojis');

        message.channel.send(embed);
    }
};