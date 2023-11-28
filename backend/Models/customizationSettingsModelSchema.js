const mongoose = require('mongoose');

const CustomizationSettingsSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: true,
    unique: true // unique_user_identifier
  },
  branding: {
    theme: {
      primaryColor: {
        type: String,
        default: '#005f73'
      },
      secondaryColor: {
        type: String,
        default: '#0a9396'
      },
      backgroundColor: {
        type: String,
        default: '#94d2bd'
      },
      headerColor: {
        type: String,
        default: '#e9d8a6'
      },
      footerColor: {
        type: String,
        default: '#ee9b00'
      },
      fontColor: {
        type: String,
        default: '#ca6702'
      },
      buttonTextColor: {
        type: String,
        default: '#bb3e03'
      },
      linkColor: {
        type: String,
        default: '#ae2012'
      },
      hoverEffectColor: {
        type: String,
        default: '#9b2226'
      }
    },
    logo: {
      url: {
        type: String,
        default: '/images/logo.png'
      },
      altText: {
        type: String,
        default: 'Company Logo'
      }
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('customizationSettings', CustomizationSettingsSchema);
