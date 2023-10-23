const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN,
        });

        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body ; 
        //1) check if user email and pass exist
        if (!email || !password) {
            next(new Error("Provide Email"));
        }
        //2) check if email and password is correct
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new Error("Incorrect Email or Password"));
        }

        //3)send jwt
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET , {
            expiresIn : process.env.JWT_EXPIRESIN
        })
        res.status(200).json({
            status : 'success',
            token
        })
    } catch (err) {
        res.status(401).json({
            status: "fail",
            message: err,
        });
    }
};
