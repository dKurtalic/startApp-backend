const Position = require('../models/Position')
const { getStartupByName } = require('./startupController')
const mongoose = require('mongoose')

const getAllPositions = async (req, res) => {
    try {
        const positions = await Position.find({}).sort({ createdAt: -1 })
        res.status(200).json(positions)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getPosition = async (req, res) => {
    try {
        const positionId = req.params.id;
        const position = await Position.findById(positionId);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.json(position);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getPositionsAtStartupWithId = async (req, res) => {
    try {
        const startupId = req.params.id;
        const positionsAtStartup = await Position.find({ startup: startupId });

        if (!positionsAtStartup) {
            return res.status(404).json({ message: 'There are no open positions at this startup right now' });
        }

        res.status(200).json(positionsAtStartup);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


const createPosition = async (req, res) => {

    const { startup, jobTitle } = req.body
    try {
        const newPosition = await Position.create({ startup, jobTitle, ...req.body })
        res.status(200).json(newPosition)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const updatePosition = async (req, res) => {
    try {
        const positionId = req.params.id;
        const updatedPosition = await Position.findByIdAndUpdate(positionId, req.body, { new: true });

        if (!updatedPosition) {
            return res.status(404).json({ message: 'Position not found' });
        }

        res.status(200).json(updatedPosition);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deletePosition = async (req, res) => {
    try {
        const positionId = req.params.id;

        const deletedPosition = await Position.findByIdAndDelete(positionId);

        if (!deletedPosition) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.status(200).json({ message: 'Position deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }

};



module.exports = {
    getAllPositions,
    getPositionsAtStartupWithId,
    updatePosition,
    deletePosition,
    createPosition,
    getPosition
}