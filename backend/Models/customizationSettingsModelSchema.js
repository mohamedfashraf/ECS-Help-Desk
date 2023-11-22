const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Theme schema
const ThemeSchema = new Schema({
    primaryColor: String,
    secondaryColor: String,
    backgroundColor: String,
    headerColor: String,
    footerColor: String,
    fontColor: String,
    buttonTextColor: String,
    linkColor: String,
    hoverEffectColor: String
});

// Define the Logo schema
const LogoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    altText: String
});

// Define the Branding schema
const BrandingSchema = new Schema({
    theme: ThemeSchema,
    logo: LogoSchema
});

// Define the main document schema
const BrandingSettingsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    admin_id: {
        type: String,
        required: true
    },
    branding: BrandingSchema,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Compile the model from the schema
const BrandingSettings = mongoose.model('BrandingSettings', BrandingSettingsSchema);

module.exports = BrandingSettings;
