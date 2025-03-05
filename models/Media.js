const { Schema, model } = require('mongoose')

const MediaSchema = Schema({
    serial: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sypnosis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },
    yearPremiere: {type: String, required: true },
    gender: { type: Schema.Types.ObjectId, ref: 'Gender', required: true},
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    producer: { type: Schema.Types.ObjectId, ref: 'Producer', required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },

})

module.exports = model('Media', MediaSchema)