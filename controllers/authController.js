const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;

try{

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({message: 'user exists'});

    }
//create a new user
const newUser = new User ({username, email, password});
await newUser.save();

// generate jwt token 

const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h'});

res.status(200).json({ token });

}catch(err){
    res.status(500).json({ message: 'server error', error: err.message});
}

};


const login = async (req, res) => {

    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'invalid password'});

        }
        //generate a jwt token

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h'});

        res.status(200).json({ token });



} catch (err){
    res.status(500).json({message: 'Internal server error', error:err.message});

}
};

module.exports = {register, login};