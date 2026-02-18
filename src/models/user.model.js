const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },

}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return n;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return;

});

userSchema.methods.comparePassword = async function (password) {
    // console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

