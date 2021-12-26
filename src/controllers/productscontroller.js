const { Products } = require("../../models");

const addProduct = async (req, res) => {
  const body = req.body.data;

  try {
    let result = await Products.create(body);
    if (result) {
      res.send({
        message: "success",
      });
    } else {
      res.status(500).send({
        message: "Unable to create Product",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { companyName, description, location, name, type } = req.body.data;
    const editProduct = await Products.update(
      {
        name,
        description,
        companyName,
        location,
        type,
      }, {
      where: {
        id: product_id
      }
    }
    )
    if (editProduct) {
      res.send({
        message: 'Product created successfully'
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    const deleteProduct = await Products.destroy({
      where: {
        id: product_id
      }
    }
    )
    if (deleteProduct) {
      res.send({
        message: 'Product deleted successfully'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const getProduct = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await Products.findAll({
      where: {
        user_id,
      },
    });
    if (result) {
      res.send({
        message: "success",
        products: result,
      });
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

const getProductById = async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Products.findByPk(product_id);
    if (product) {
      res.send({
        message: "success",
        product,
      });
    } else {
      res.status(404).send({
        message: "Product not found",
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
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getProductById
};
