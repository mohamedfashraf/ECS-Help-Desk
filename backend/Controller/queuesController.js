const Queues = require('../Models/queuesSchema');

async function createQueues(req, res) {
    try {
        const { highQueue, mediumQueue, lowQueue } = req.body;

        const newQueues = new Queues({
            highQueue: highQueue || [],
            mediumQueue: mediumQueue || [],
            lowQueue: lowQueue || [],
        });

        await newQueues.save();
        res.status(201).json({ message: 'Queues created successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getQueues(req, res) {
    try {
        const queues = await Queues.findOne({});
        res.status(200).json(queues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



async function clearQueues(req, res) {
    try {
        const queues = await Queues.findOne({});
        if (!queues) {
            return res.status(404).json({ message: 'Queues not found.' });
        }

        queues.highQueue = [];
        queues.mediumQueue = [];
        queues.lowQueue = [];

        await queues.save();
        res.status(200).json({ message: 'Queues cleared successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createQueues,
    getQueues,
    clearQueues,
};