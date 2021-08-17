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
      where: { email: email },
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
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const result = await Users.findAll({
      where: { email: email },
    });

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, function (err, response) {
        if (response) {
          var token = jwt.sign(email, process.env.JWT_SECRET);
          let userData = {
            uuid: result[0].uuid,
            token,
            name: result[0].name,
            email: result[0].email,
            profile_img:result[0].profile_img
          }
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
  }
};

const EditProfileDetails = async (req, res) => {

  const { token, name, image, uuid } = req.body.data;
  let decodedJWT = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      return decoded;
    }
  );
  if (decodedJWT) {
    try {
      let uploadImageData = await cloudinary.uploader.upload_large(image, {
        resource_type: "image"
      }, function (error, result) {
      });
      console.log(uuid);
      if (uploadImageData.url) {
        await Users.update({ name, profile_img: uploadImageData.url }, {
          where: {
            uuid
          }
        })
      } else {
        await Users.update({ name }, {
          where: {
            uuid,
          }
        })
      }
      res.send({
        message: "success",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send({
      message: "invalid_token",
    });
  }
};

module.exports = {
  SignUp,
  Login,
  EditProfileDetails,
};
