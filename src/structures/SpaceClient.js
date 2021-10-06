const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')
const { TOKEN, MONGOSTRING } = require('../util/config')
const { GuildsProvider } = require('../structures/Providers')
const { embed } = require('../util/function')
const mongoose = require('mongoose')


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
            prefix: async message => {
                const guildPrefix = await this.guildSettings.get(message.guild)
                if (guildPrefix) return guildPrefix.prefix
                return config.prefix
            },
            defaultCooldown: 2000,
            directory: './src/commands/'
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        })
    
        this.functions = { embed: embed }
        this.guildSettings = new GuildsProvider()
    }

    init() {
        this.commandHandler.loadAll()
        this.commandHandler.useListenerHandler(this.listenerHandler);
        console.log(`Commandes -> ${this.commandHandler.modules.size}`)
        this.listenerHandler.loadAll();
        console.log(`Listeners -> ${this.listenerHandler.modules.size}`)
    }

    async start() {
        try {
            await mongoose.connect(MONGOSTRING, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            })
            console.log("DB connectée!")
        } catch (e) {
            console.log("DB pas connectée! Voir l'erreur ci-dessous!\n\n", e)
            return process.exit
        }

        await this.init()
        return this.login(TOKEN)
    }
}