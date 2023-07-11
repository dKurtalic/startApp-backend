const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memberSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    position: { type: String }
}, { _id: false });


const startupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    members: {
        type: [memberSchema]
    },
    openPositions: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Position' }]
    },
    additionalFiles: {
        type: [{
            fileName: String,
            filePath: String
        }]
    },
    photos: {
        type: [String]
    },
    coverPhoto: {
        type: String
    },
    logo: {
        type: String
    },
    video: {
        type: String
    },
    location: {
        type: String
    },
    foundingDate: {
        type: Date
    }

}, { timestamps: true });

const Startup = mongoose.model('Startup', startupSchema);
module.exports = Startup;