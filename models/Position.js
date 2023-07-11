const mongoose = require('mongoose');

const Schema = mongoose.Schema
const positionSchema = Schema({
    startup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Startup',
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String
    },
    keyResponsibilities: {
        type: [String]
    },
    requirements: {
        type: [String]
    },
    open: {
        type: Boolean
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship'],
        default: 'full-time'
    },
    level: {
        type: String,
        enum: ['Entry-level', 'Mid-level', 'Senior-level', 'Executive-level'],
        default: 'Entry-level'
    }

}, { timestamps: true });

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
