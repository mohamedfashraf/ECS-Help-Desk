const mongoose = require("mongoose");

const customizationSchema = new mongoose.Schema({
  theme: {
    type: String,
    enum: ["dark", "light"],
    default: "dark",
  },
  // You can add more settings here as needed
});

const Customization = mongoose.model("Customization", customizationSchema);

module.exports = Customization;
