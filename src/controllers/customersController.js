const { Customers } = require("../../models");

const addCustomer = async (req, res) => {
  const body = req.body.data;

  try {
    let result = await Customers.create(body);
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
    const { companyName, description, location, name, type } = req.body.data;
    const editCustomer = await Customers.update(
      {
        name,
        description,
        companyName,
        location,
        type,
      }, {
      where: {
        id: customer_id
      }
    }
    )
    if (editCustomer) {
      res.send({
        message: 'Customer created successfully'
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const { customer_id } = req.body;
    const deleteCustomer = await Customers.destroy({
      where: {
        id: customer_id
      }
    }
    )
    if (deleteCustomer) {
      res.send({
        message: 'Customer deleted successfully'
      })
    }

  } catch (error) {
    console.log(error);
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

const getCustomerById = async (req, res) => {
  const { customer_id } = req.params;
  try {
    const customer = await Customers.findByPk(customer_id);
    if (customer) {
      res.send({
        message: "success",
        customer,
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
  deleteCustomer,
  getCustomerById
};
