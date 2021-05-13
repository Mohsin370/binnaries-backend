const Pool = require('../Models/db');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

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

    const ExistingUser = await Pool.query(`Select email from public.users where email = '${email}'`);
    if (ExistingUser.rows.length > 0) {
        res.send({
            message: "User already Exist",
        })
    }

    const result = await Pool.query(`INSERT INTO public.users(name,email,password)VALUES ('${name}','${email}','${encryptedPassword}')`);
    if (result) {
        res.send({
            message: "success"
        })
    } else {
        res.send({
            message: "exists"
        })
    }
}


const Login = async (req, res) => {
    const { email, password } = req.body.data;
    const result = await Pool.query(`Select * from users where email = '${email}'`);
    if (result) {
        bcrypt.compare(password, result.rows[0].password, function (err, result) {
            if (result) {
                var token = jwt.sign(email, 'supersecret');
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
            message: "exists"
        })
    }
}



module.exports = {
    SignUp,
    Login
}