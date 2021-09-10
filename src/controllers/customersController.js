var jwt = require("jsonwebtoken");
const {customers} = require("../../models");
const {Users} = require("../../models");

const addCustomer = async (req, res) => {
  const { name, companyName, description, location, token, uuid } = req.body.data;
  let decodedJWT = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      return decoded;
    }
  );
  if (decodedJWT) {
    try {
      let result = await customers.create({
        name,
        companyName,
        description,
        location,
        uuid
      });
      if (result) {
        res.send({
          message: "success",
        });
      } else {
        res.send({
          message: "DBError",
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
          err,
      })
    }
  } else {
    res.send({
      message: "invalid_token",
    });
  }
};

const getCustomer = async (req, res) => {
  const {token,uuid} = req.query;
  let decodedJWT = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      return decoded;
    }
  );
  if (decodedJWT) {
    try {
      const result = await customers.findAll({
          where:{
              uuid
          }
      })
      if (result) {
        res.send({
          message: "success",
          accounts: result,
        });
      } else {
        res.send({
          message: "DBError",
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
          error:err
      })
    }
  } else {
    res.send({
      message: "invalid_token",
    });
  }
};

module.exports = {
  addCustomer,
  getCustomer,
};
