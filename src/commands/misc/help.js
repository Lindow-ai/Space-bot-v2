const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
           aliases: ['help', 'h'],
           category: 'Misc',
           description: {
            content: 'La commande help renvoie la liste de commande du bot!',
            usage: '(h)elp <command>',
            exemples: ['help', 'help ping', 'h userinfo']
        },
           args: [{ id: 'command', type: 'commandAlias' }] 
        });
    }

   async exec(message, args) {
        const prefix = await this.handler.prefix(message)
        const command = args.command

        if (!command) {
            let embed = this.client.functions.embed()
            .setAuthor(
                `Bonjour, mon nom est ${this.client.user.username}!`,
                this.client.user.displayAvatarURL()
            )
            .setDescription(`Retrouvez la liste de toutes nos commandes ci-dessous! Si vous avez besoin d'assistance, rejoignez [notre serveur ] (...)**--------------**`)
            
            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `${category.id}`,
                    `${category
                    .filter(cmd => cmd.aliases.length > 0)
                    .map(cmd => `\`${cmd.aliases[0]}\``)
                    .join(', ')}`
                )
            }

            embed.addField(
                '--------------',
                `**\`${prefix}help <command>\` pour des infos sur une commande spécifique.**
                Exemples: \`${prefix}help ping\` | \`${prefix} help userinfo\``)

            return message.channel.send({ embeds: [ embed ]})
        }

        return message.channel.send(stripIndents`
        \`\`\`makefile
        [help: Command -> ${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Admin only /!\\' : ''}

        ${command.description.content}

        Utilisation: ${prefix}${command.description.usage}
        Exemples: ${prefix}${command.description.exemples.join(` | ${prefix}`)}

        --- 

        ${prefix} = prefix à utiliser sur le bot 
        () = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
        Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
        Si vous avez un problème, rejoignez le serveur support!
        \`\`\``)
    }
}

module.exports = HelpCommand;