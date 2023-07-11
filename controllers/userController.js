const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const checkId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Id' })
    }
}

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//get a single user
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        checkId(userId)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getUserByEmail = async (req, res) => {
    try {
        const userEmail = req.params.email;
        console.log("user email : " + userEmail)
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

//create new user
const createUser = async (req, res) => {

    const { fullName, email, password, city } = req.body

    try {

        if (!email || !password) throw Error("All fields must be filled")
        if (!validator.isEmail(email)) throw Error("Invalid Email")
        if (!validator.isStrongPassword(password)) throw Error("Password is not strong enough")
        const checkIfUsed = await User.findOne({ email })
        if (checkIfUsed) { throw Error("Email is already in use") }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullName, email, password: hash, city })

        const token = createToken(newUser._id)
        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) throw Error("All fields must be filled")
        const user = await User.findOne({ email })
        if (!user) throw Error("No user with provided email")

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw Error("Incorrect credentials")

        const token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete the user from the database based on the userId
        checkId(userId)
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }

};

//update a user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Update the user in the database based on the userId
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



module.exports = {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
    getUserByEmail
}