const Pool = require('../Models/db');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const { Users } = require('../../models')

const encryptPassword = async (Password) => {
    let promise = new Promise((res, rej) => {
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(Password, salt, function (err, hash) {
                res(hash);
            });
        });
    })
    return promise.then((res) => { return res })
}

const SignUp = async (req, res) => {
    const { email, name, password } = req.body.data;
    let encryptedPassword = await encryptPassword(password);

    try {

        const ExistingUser = await Users.findAll({
            where: { email: email }
        });

        if (ExistingUser.length > 1) {
            res.send({
                message: "User already Exist",
            })
            return 0
        }
    } catch (err) {
        console.log(err);
    }

    try {
        let result = await Users.create({ name, email, password: encryptedPassword })
        if (result) {
            res.send({
                message: "success"
            })
        } else {
            res.send({
                message: "exists"
            })
        }
    } catch (err) {
        console.log(err);
    }
}


const Login = async (req, res) => {
    const { email, password } = req.body.data;
    const result = await Pool.query(`Select * from users where email = '${email}'`);
    if (result.rows.length > 0) {
        bcrypt.compare(password, result.rows[0].password, function (err, result) {
            if (result) {
                var token = jwt.sign(email, process.env.JWT_SECRET);
                res.send({
                    message: "success",
                    email,
                    token,
                })
            } else {
                res.send({
                    message: "invalid"
                })
            }
        })
    } else {
        res.send({
            message: "email_invalid"
        })
    }
}



module.exports = {
    SignUp,
    Login
}