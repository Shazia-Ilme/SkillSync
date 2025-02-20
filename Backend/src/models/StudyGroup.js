const mongoose = require('mongoose');

const studyGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    preferredTimes: [{ type: String }],
    location: { type: String, required: true },
    mode: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('StudyGroup', studyGroupSchema);