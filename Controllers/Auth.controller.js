const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
try{

  const { email, password } = req.body;

//agr fields empty then return error
  if(!email || !password) {
    return res.status(400).json({
        message : "Email and password are required"
    })
}

//check if user already exists
const existingUser = await User.findOne({email});
if(existingUser) {
    return res.status(400).json({
        message : "User already exists"
    })
}
//create user in database
    const newUser = await User.create({email, password});
    newUser.password = undefined; //remove password from response


    return res.status(201).json({
        message : "User created successfully",
        data : newUser
    })

}
catch(err){
    return res.status(500).json({
        message : err.message
    })
}
}

//login function
const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message : "Email and password are required"
        })
    }
//match user in database
    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({
            message : "User not found"
        })
    }

//match password
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({
            message : "Invalid password"
        })
    }

    user.password = undefined; //remove password from response
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({
        message : "Login successful",
        data : user,
        token
    })


}


module.exports = { register, login }


