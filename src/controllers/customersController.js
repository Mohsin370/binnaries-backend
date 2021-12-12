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
        message: "Unable to create customer",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

const editCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const editCustomer = await Customers.update(
      req.body.data, {
      where: {
        customer_id
      }
    }
    )
    if (editCustomer) {
      res.send({
        message: 'Customer created successfully'
      })
    }

  } catch (error) {
    res.status(500).send(error);
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const deleteCustomer = await Customers.destroy({
      where: {
        customer_id
      }
    }
    )
    if (deleteCustomer) {
      res.send({
        message: 'Customer deleted successfully'
      })
    }

  } catch (error) {
    res.status(500).send(error);
  }
}

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
      res.status(404).send({
        message: "Customer not found",
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
  editCustomer,
  deleteCustomer
};
