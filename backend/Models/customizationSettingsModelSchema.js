const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const LogoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    altText: String
});

const BrandingSchema = new Schema({
    theme: ThemeSchema,
    logo: LogoSchema
});

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

const BrandingSettings = mongoose.model('BrandingSettings', BrandingSettingsSchema);

module.exports = BrandingSettings;
