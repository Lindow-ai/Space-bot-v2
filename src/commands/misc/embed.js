const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
           aliases: ['embed'] 
        });
    }

    exec(message) {
        return message.channel.send({ embeds: [ 
            this.client.functions.embed()
            .setDescription("Hello!")
            .addField('Champ 1', 'Valeur Champ 1')
        ]})
    }
}

module.exports = EmbedCommand;