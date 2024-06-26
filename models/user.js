const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


//presaving the middleware to hash the password before saving 

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    } 
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err){
        next(err);
    }

});

// method to compare password

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const user = mongoose.model('user', userSchema);
module.exports = user;

