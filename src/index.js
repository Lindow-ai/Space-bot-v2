const SpaceClient = require('./structures/SpaceClient')

let client = new SpaceClient({
    prefix: '$'
})

client.start()