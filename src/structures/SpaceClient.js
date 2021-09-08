const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')
const { embed } = require('../util/function')

module.exports = class SpaceClient extends AkairoClient {
    constructor(config = {}) {
        super(
            { ownerID: '263328052237434880' },
            { 
                allowedMentions: {
                    parse: ['roles', 'everyone', 'users'],
                    repliedUser: false
                },
                partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
                // presence: {
                //     status: 'dnd',
                //     activities: [
                //         {
                //             name: 'Space.exe',
                            
                //         }
                //     ]
                // },
                intents: 32767
            }
        )
 
        this.commandHandler = new CommandHandler(this, {
            allowMention: true,
            prefix: config.prefix,
            defaultCooldown: 2000,
            directory: './src/commands/'
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        })

    
        this.functions = {
            embed: embed
        }

        this.commandHandler.loadAll()
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}