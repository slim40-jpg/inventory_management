const mongoose = require('mongoose');

const EntrepriseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,

    },
    
    CA : {
        type: Number,
    }

}, {timestamps: true});
module.exports = mongoose.model('Entreprise' , EntrepriseSchema);