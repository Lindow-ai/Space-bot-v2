const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
           aliases: ['userinfo', 'info'],
        //    description: "Affiche les informations de l'utilisateur",
        //    ignoreCooldown: '263328052237434880',
        //    ignorePermissions: '263328052237434880',
           userPermissions: 'KICK_MEMBERS',
           clientPermissions: 'KICK_MEMBERS',
           category: 'Misc',
           description: {
            content: "La commande userinfo renvoie des infos sur l'utilisateur!",
            usage: 'user(info) <member>',
            exemples: ['userinfo', 'info @member']
        },
        //    ratelimit: 1,
           cooldown: 5000,
           typing: true,
           ownerOnly: true,
           channel: 'guild',
           args: [
               { id: 'member', type: 'member', default: message => message.member },
           ],
        });
    }

    exec(message, args) {
        return message.channel.send({ embeds: [
            this.client.functions.embed()
            .setTitle(`${args.member.displayName} (${args.member.id})`)
            .setThumbnail(args.member.user.displayAvatarURL())
            .setDescription(`Son compte a été créé le ${args.member.user.createdAt}`)
        ]})
    }
}

module.exports = UserInfoCommand;