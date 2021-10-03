const { Shema, model, Schema } = require('mongoose')

const guildSchema = Schema({
    id: String,
    prefix: {
        type: String,
        default: '$'
    }
})

module.exports = {
    Guild: model('Guild', guildSchema)
}