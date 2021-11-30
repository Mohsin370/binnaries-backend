const { Customers } = require("../../models");

const addCustomer = async (req, res) => {
  const { name, companyName, description, location, user_id } = req.body.data;

  try {
    let result = await Customers.create({
      name,
      companyName,
      description,
      location,
      user_id,
    });
    if (result) {
      res.send({
        message: "success",
      });
    } else {
      res.status(500).send({
        message: "DBError",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

const getCustomer = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await Customers.findAll({
      where: {
        user_id,
      },
    });
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
    res.status(500).send({
      error,
    });
  }
};

module.exports = {
  addCustomer,
  getCustomer,
};
