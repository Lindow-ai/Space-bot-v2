const { Command } = require('discord-akairo');

class ServerInfoCommand extends Command {
    constructor() {
        super('serverinfo', {
           aliases: ['serverinfo'],
           category: 'Misc',
           description: {
            content: "La commande serverinfo renvoie des infos sur le serveur!",
            usage: 'serverinfo',
            exemples: ['serverinfo']
        },
           channel: 'guild',
        });
    }

    async exec(message, args) {
        const guild = message.guild
        const owner = await guild.fetchOwner()

        return message.channel.send({ embeds: [
            this.client.functions.embed()
            .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            .setThumbnail(guild.iconURL())
            .setDescription(`Owner: ${owner.displayName} (${owner.id})
            Créer le: ${guild.createdAt}
            
            Utilisateurs: ${guild.memberCount}
            Salons: ${guild.channels.cache.size}`)
        ]})
    }
}

module.exports = ServerInfoCommand;