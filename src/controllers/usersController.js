const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Users } = require("../../models");
var cloudinary = require("cloudinary").v2;

const encryptPassword = async (Password) => {
    let promise = new Promise((res, rej) => {
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(Password, salt, function (err, hash) {
                res(hash);
            });
        });
    });
    return promise.then((res) => {
        return res;
    });
};

const SignUp = async (req, res) => {
    const { email, name, password } = req.body.data;
    let encryptedPassword = await encryptPassword(password);

    try {
        const ExistingUser = await Users.findAll({
            where: { email },
        });

        if (ExistingUser.length > 0) {
            res.send({
                message: "User already Exist",
            });
            return 0;
        }
    } catch (err) {
        console.log(err);
    }

    try {
        let result = await Users.create({
            name,
            email,
            password: encryptedPassword,
        });
        if (result) {
            res.send({
                message: "success",
            });
        } else {
            res.send({
                message: "exists",
            });
        }
    } catch (err) {
        console.log(err);
        res.send({
            message: "Error",
            err,
        });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body.data;
    try {
        const result = await Users.findAll({
            where: { email },
        });

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, function (err, response) {
                if (response) {
                    var token = jwt.sign(email, process.env.JWT_SECRET);
                    let userData = {
                        uuid: result[0].id,
                        token,
                        name: result[0].name,
                        email: result[0].email,
                        profile_img: result[0].profile_img,
                    };
                    res.send({
                        userData,
                        message: "success",
                    });
                } else {
                    res.send({
                        message: "invalid",
                    });
                }
            });
        } else {
            res.send({
                message: "email_invalid",
            });
        }
    } catch (err) {
        console.log("err", err);
        res.send({
            message: "Error",
            err,
        });
    }
};

const EditProfileDetails = async (req, res) => {
    const uuid = req.params.uuid;
    const { name, image } = req.body.data;
    try {
        if (image) {
            let uploadImageData = await cloudinary.uploader.upload_large(
                image,
                {
                    resource_type: "image",
                },
            );
            if (uploadImageData.url) {
                await Users.update(
                    { name, profile_img: uploadImageData.url },
                    {
                        where: {
                            id: uuid,
                        },
                    }
                );
                res.send({
                    message: "success",
                    profile_img: uploadImageData.url,
                });
            }
        } else {
            await Users.update(
                { name },
                {
                    where: {
                        id: uuid,
                    },
                }
            );
            res.send({
                message: "success",
            });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
};

const GetProfileDetails = async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await Users.findAll({
            attributes: ["name", "email", "profile_img"],
            where: {
                id: uuid,
            },
        });
        res.send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "something went wrong",
            err,
        });
    }
};

const ChangePassword = async (req, res) => {
    const uuid = req.params.uuid;
    const { currentPassword, newPassword } = req.body.data;
    try {
        let result = await Users.findAll({
            attributes: ["password"],
            where: {
                id: uuid,
            },
        });
        bcrypt.compare(
            currentPassword,
            result[0].password,
            async function (err, response) {
                if (response) {
                    let encryptedPassword = await encryptPassword(newPassword);
                    await Users.update(
                        { password: encryptedPassword },
                        {
                            where: {
                                id: uuid,
                            },
                        }
                    );
                    res.send({
                        message: "success",
                    });
                } else {
                    res.statu(400).send({
                        message: "Old password is not correct",
                    });
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.send({
            message: "something went wrong",
            err,
        });
    }
};

module.exports = {
    SignUp,
    Login,
    EditProfileDetails,
    GetProfileDetails,
    ChangePassword,
};
