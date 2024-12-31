
const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                sucess: false,
                message: "Token Missing",
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECREAT);
            console.log(decode);

            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                sucess: false,
                message: 'token is invalid',
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            sucess: false,
            message: "something went wrong, while verifying the token",
        })
    }

}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(400)
                .json({
                    sucess: false,
                    messsage: " this is protected router for student",
                });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            sucess: false,
            message: "user role is not matching",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(400)
                .json({
                    sucess: false,
                    messsage: " this is protected router for Admin",
                });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            sucess: false,
            message: "user role is not matching",
        })
    }
}