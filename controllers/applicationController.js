const Application = require('../models/Application')
const mongoose = require('mongoose')

const checkId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Id' })
    }
}

//get all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find({}).sort({ createdAt: -1 })
        res.status(200).json(applications)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//get a single application
const getApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        checkId(applicationId)
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }

}

//create new application
const createApplication = async (req, res) => {

    const { applicant, startup, message } = req.body
    try {
        const newApplication = await Application.create({ applicant, startup, message, ...req.body })
        res.status(200).json(newApplication)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a Application
const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        checkId(applicationId)
        const deletedApplication = await Application.findByIdAndDelete(applicationId);

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }

};

//update a application
const updateApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        // Update the application in the database based on the applicationId
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, req.body, { new: true });

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getApplicationsFromUser = async (req, res) => {
    try {
        const applicantId = req.params.id;
        const usersApplications = await Application.find({ applicant: applicantId });

        if (!usersApplications) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(usersApplications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


module.exports = {
    createApplication,
    getAllApplications,
    getApplication,
    deleteApplication,
    updateApplication,
    getApplicationsFromUser
}