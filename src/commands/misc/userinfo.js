const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
           aliases: ['userinfo', 'info'],
           category: 'Misc',
           description: {
            content: "La commande userinfo renvoie des infos sur l'utilisateur!",
            usage: 'user(info) <member>',
            exemples: ['userinfo', 'info @member']
        },
           channel: 'guild',
           args: [{ id: 'member', type: 'member', default: message => message.member }],
        });
    }

    exec(message, args) {
        const guildMember = args.member

        return message.channel.send({ embeds: [
            this.client.functions.embed()
            .setAuthor(`${guildMember.displayName} (${guildMember.id})`, guildMember.user.displayAvatarURL())
            .setThumbnail(guildMember.user.displayAvatarURL())
            .setDescription(`
            Son compte a été créé le ${guildMember.user.createdAt}

            Il a rejoint le seurveur le ${guildMember.joinedAt}
            
            Bot: ${guildMember.user.bot}
            
            Roles: ${guildMember.roles.cache.map(r => r.name).join(', ')}
        
            `)
        ]})
    }
}

module.exports = UserInfoCommand;