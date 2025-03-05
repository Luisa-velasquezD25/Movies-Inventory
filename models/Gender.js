const { Schema, model } = require('mongoose')

const GenderSchema  = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Activo', 'Inactivo' ]},
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },
    description: { type: String, required: true },

})

module.exports = model('Gender', GenderSchema )