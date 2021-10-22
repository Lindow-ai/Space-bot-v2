const { Listener } = require('discord-akairo')

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    exec() {
        this.client.user.setPresence({ activities: [{ name: 'with Lindow', type: 'PLAYING' }], status: 'dnd' })

        const notBotUsers = this.client.users.cache.filter(user => !user.bot)
        const textChannel = this.client.channels.cache.filter(channel => channel.type == "GUILD_TEXT")

        console.log(`Prêt à servir ${this.client.guilds.cache.size} serveurs, ${notBotUsers.size} utilisateurs (bot non-inclus) et ${textChannel.size} salons textuels.`)
    }
}

module.exports = ReadyListener;