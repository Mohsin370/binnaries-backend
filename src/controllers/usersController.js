const Pool = require('../Models/db');
const bcrypt = require('bcrypt');


const encryptPassword = async (Password) => {
    let promise = new Promise((res, rej) => {
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(Password, salt, function (err, hash) {
                res(hash);
            });
        });
    })
    return promise.then((res) => {return res})
}

const SignUp = async (req, res) => {
    const { email, name, password } = req.body.data;
    let encryptedPassword = await encryptPassword(password);

    const result = await Pool.query(`INSERT INTO public.users(name,email,password)VALUES ('${name}','${email}','${encryptedPassword}')`);
    if (result) {
        res.send({
            message: "SignUp Successful"
        })
    } else {
        res.send({
            message: "failed"
        })
    }
}
const Login = async (req, res) => {
    const result = await Pool.query("Select * from users");
    res.send(result)
}




module.exports = {
    SignUp,
    Login
}