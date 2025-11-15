const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,

    },
    logo : {
        type: SVGAElement,
        
    },
    CA : {
        type: Number,
    }

}, {timestamps: true});
module.exports = mongoose.model('Company' , companySchema);