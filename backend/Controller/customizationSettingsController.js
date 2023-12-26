const logger = require('../Controller/knowledgeBaseController'); // Adjust the path accordingly
const CustomizationSettings = require('../Models/customizationSettingsModelSchema');

// Get Customization Settings "works"
exports.getSettings = async (req, res) => {
    try {
        // findone -> there is only one document in the collection
        const settings = await CustomizationSettings.findOne({});
        if (!settings) {
            logger.error('Customization settings not found');
            return res.status(404).json({ message: 'Customization settings not found' });
        }

        logger.info('Customization settings retrieved successfully');
        res.status(200).json(settings);
    } catch (error) {
        logger.error(`Error getting customization settings: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update Customization Settings "works"
exports.updateSettings = async (req, res) => {
    const { branding } = req.body;

    try {
        // findone -> there is only one document in the collection
        const settings = await CustomizationSettings.findOne({});

        if (!settings) {
            logger.error('Customization settings not found');
            return res.status(404).json({ message: 'Customization settings not found' });
        }

        settings.branding = branding;
        settings.updatedAt = Date.now();

        await settings.save();

        const updatedSettings = await CustomizationSettings.findOne({});

        logger.info('Customization settings updated successfully');
        res.status(200).json({
            message: 'Customization settings updated successfully',
            settings: updatedSettings,
        });
    } catch (error) {
        logger.error(`Error updating customization settings: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
