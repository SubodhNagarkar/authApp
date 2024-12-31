
const bcrypt = require("bcrypt");

const User = require("../model/user");

const jwt = require("jsonwebtoken");

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exist",
                sucess: false,
            })
        }
        let hashPassaword;
        try {
            hashPassaword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                message: "Error occuerd in hashing .",
                sucess: false,
            })
        }

        const user = await User.create({
            name, email, password: hashPassaword, role
        });

        return res.status(200).json({
            message: "User created ............",
            sucess: true,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "User not registerd/created ............",
            sucess: true,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                sucess: false,
                message: "please enter user and password"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                sucess: false,
                messgae: "user not registerd"
            });
        }
        const payload = {
            email: user.email,
            password: user.password,
            role: user.role,

        }
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload,
                process.env.JWT_SECREAT,
                {
                    expiresIn: '2h',
                });
            userRe = user.toObject();
            userRe.token = token;
            userRe.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                sucess: true,
                token, userRe,
                message: "Congratulations , You have sucessfully log in"
            })

        } else {
            return res.status(400).json({
                sucess: false,
                message: "Password incorrect"
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            sucess: false,
            message: "server error"
        });
    }
}