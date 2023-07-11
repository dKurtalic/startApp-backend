const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    confirmedEmail: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    zipCode: {
        type: String
    },
    birthDate: {
        type: Date
    },
    occupation: {
        type: String
    },
    skills: {
        type: [String]
    },
    interests: [String],
    likedStartups: {
        type: [Schema.Types.ObjectId],
        ref: 'Startup'
    },
    appliedForPositions: {
        type: [Schema.Types.ObjectId],
        ref: 'Position'
    },
    positions: {
        type: [Schema.Types.ObjectId],
        ref: 'Position'
    }

}, { timestamps: true })




const User = mongoose.model('User', userSchema);

module.exports = User;
