const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin' , 'staff'],
        default: 'staff'
    },
    company: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    }
},
{timestamps: true});
UserSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 12);
});
UserSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword , this.password);
};
module.exports = mongoose.model('User' , UserSchema);