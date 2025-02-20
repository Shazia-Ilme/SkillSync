const StudyGroup = require('../models/StudyGroup');
const User = require('../models/User');
const aiMatchingService = require('../services/aiMatchingService');

// Create a new study group
exports.createStudyGroup = async (req, res) => {
    try {
        const { name, subject, preferredTimes, location, mode } = req.body;

        const studyGroup = new StudyGroup({
            name,
            subject,
            preferredTimes,
            location,
            mode,
            creator: req.user.id
        });

        await studyGroup.save();

        res.status(201).json(studyGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Match users to study groups
exports.matchStudyGroup = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const studyGroups = await StudyGroup.find({ subject: user.interests });

        const matchedGroups = aiMatchingService.matchUsersToGroups(user, studyGroups);

        res.status(200).json(matchedGroups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get study group details
exports.getStudyGroupDetails = async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id).populate('members');
        res.status(200).json(studyGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Join a study group
exports.joinStudyGroup = async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (!studyGroup.members.includes(req.user.id)) {
            studyGroup.members.push(req.user.id);
            await studyGroup.save();
        }
        res.status(200).json(studyGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};