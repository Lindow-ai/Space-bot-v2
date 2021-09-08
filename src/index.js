const { TOKEN } = require('./util/config')
const SpaceClient = require('./structures/SpaceClient')

let client = new SpaceClient({
    prefix: '$'
})

client.login(TOKEN)