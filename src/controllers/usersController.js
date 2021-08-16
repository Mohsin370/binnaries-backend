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
cloudinary.config({
  cloud_name: "khawaja",
  api_key: "227528723768797",
  api_secret: "24EueIlrkrn2RmWaXEFrBqnMAcY",
  secure: true,
});

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
    console.log(result);

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign(email, process.env.JWT_SECRET);
          res.send({
            message: "success",
            email,
            token,
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
  const { token, name, image } = req.body.data;
  let decodedJWT = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      return decoded;
    }
  );
  if (decodedJWT) {
    try {
      cloudinary.uploader.upload(image, function (error, result) {
        console.log(result, error);
      });

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
