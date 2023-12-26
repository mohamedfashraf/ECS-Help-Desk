const logger = require('../Controller/loggerController'); // Adjust the path accordingly
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
        logger.info('Queues created successfully');
        res.status(201).json({ message: 'Queues created successfully.' });
    } catch (error) {
        logger.error(`Error creating queues: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

async function getQueues(req, res) {
    try {
        const queues = await Queues.findOne({});
        logger.info('Retrieved queues successfully');
        res.status(200).json(queues);
    } catch (error) {
        logger.error(`Error retrieving queues: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

async function clearQueues(req, res) {
    try {
        const queues = await Queues.findOne({});
        if (!queues) {
            logger.warn('Queues not found for clearing');
            return res.status(404).json({ message: 'Queues not found.' });
        }

        queues.highQueue = [];
        queues.mediumQueue = [];
        queues.lowQueue = [];

        await queues.save();
        logger.info('Queues cleared successfully');
        res.status(200).json({ message: 'Queues cleared successfully.' });
    } catch (error) {
        logger.error(`Error clearing queues: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createQueues,
    getQueues,
    clearQueues,
};
