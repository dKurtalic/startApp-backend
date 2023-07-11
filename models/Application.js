const mongoose = require('mongoose');

const Schema = mongoose.Schema
const applicationSchema = Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Startup',
        required: true
    },
    message: {
        type: String
    },
    cv: {
        type: String
    },
    additionalFiles: {
        type: [{
            fileName: String,
            filePath: String
        }]
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
