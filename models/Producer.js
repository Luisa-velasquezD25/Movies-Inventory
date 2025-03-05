const { Schema, model } = require('mongoose')

const ProducerSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Activo', 'Inactivo' ]},
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },
    slogan: { type: String, required: true },
    description: { type: String, required: true },

})

module.exports = model('Producer', ProducerSchema)