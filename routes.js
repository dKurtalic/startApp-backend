const express = require('express')
const router = express.Router();
const User = require('./models/User')
const { createUser, getAllUsers, getUser, deleteUser, updateUser, loginUser, getUserByEmail } = require('./controllers/userController')
const { createStartup, deleteStartup, updateStartup, getAllStartups, getStartup, getStartupByName, getJobAtStartup, addMembers } = require('./controllers/startupController')
const { getApplicationsFromUser, createApplication, deleteApplication, updateApplication, getAllApplications, getApplication } = require('./controllers/applicationController')
const { getPositionsAtStartupWithId, getPosition, getAllPositions, createPosition, updatePosition, deletePosition } = require('./controllers/positionController')


router.get('/', (req, res) => {
    res.json({ mssg: 'evoo pocetak' });
})
router.get('/signin', (req, res) => {
    res.json({ mssg: 'signin' });
})
router.post('/users/register', createUser)
router.post('/users/login', loginUser)
router.get('/users', getAllUsers);
router.get('/user/:id', getUser)
router.get('/userByEmail/:email', getUserByEmail)
router.delete('/user/:id', deleteUser)
router.patch('/user/:id', updateUser)

router.post('/startup/create', createStartup)
router.get('/startups', getAllStartups)
router.get('/startup/:id', getStartup)
router.delete('/startup/:id', deleteStartup)
router.patch('/startup/:id', updateStartup)
router.patch('/startup/:id/addMembers', addMembers)

router.get('/positions', getAllPositions)
router.get('/position/:id', getPosition)
router.post('/position/create', createPosition)
router.patch('/position/:id', updatePosition)
router.delete('/position/id', deletePosition)
router.get('/startup/:id/positions', getPositionsAtStartupWithId)



router.post('/application/create', createApplication)
router.get('/applications', getAllApplications);
router.get('/application/:id', getApplication)
router.get('/applications/:userId', getApplicationsFromUser)
router.delete('/application/:id', deleteApplication)
router.patch('/application/:id', updateApplication)

router.get('/startupDetails/:startupName', getStartupByName);
router.get('/startupDetails/:startupName/:jobTitle', getJobAtStartup)

module.exports = router