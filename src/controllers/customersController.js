var jwt = require("jsonwebtoken");
const {customers} = require("../../models");
const {Users} = require("../../models");

const addCustomer = async (req, res) => {
  const { name, companyName, description, location, uuid } = req.body.data;

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
};

const getCustomer = async (req, res) => {
  const {uuid} = req.query;

    try {
      const result = await customers.findAll({
          where:{
              uuid
          }
      })
      if (result) {
        res.send({
          message: "success",
          customers: result,
        });
      } else {
        res.send({
          message: "DBError",
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
          error
      })
    }
};

module.exports = {
  addCustomer,
  getCustomer,
};
