const { Command } = require('discord-akairo');

class BotInfoCommand extends Command {
    constructor() {
        super('botinfo', {
           aliases: ['botinfo'],
           category: 'Misc',
           description: {
            content: "La commande botinfo renvoie des infos sur le bot!",
            usage: 'botinfo',
            exemples: ['botinfo']
        },
           channel: 'guild',
        });
    }

    exec(message, args) {
        const bot = this.client
        const notBotUsers = this.client.users.cache.filter(user => !user.bot)

        return message.channel.send({ embeds: [
            bot.functions.embed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`Maintainer: [Lindow#8780](https://github.com/Lindow-ai)
            Uptime: ${bot.uptime}
            ---
            **Users**: ${notBotUsers.size}
            **Servers**: ${bot.guilds.cache.size}
            **Salons**: ${bot.channels.cache.size}
            `)
        ]})
    }
}

module.exports = BotInfoCommand;