const express = require("express");
const userController = require("./src/controllers/usersController");
const accountsController = require("./src/controllers/accountsController");
const customersController = require("./src/controllers/customersController");
const productsController = require("./src/controllers/productsController");
const AuthMiddleware = require('./src/middlewares/authMiddleware');
const { sequelize } = require("./models");
var cloudinary = require("cloudinary").v2;


const app = express();
app.use(express.json({ limit: '50mb' }));
require("dotenv").config();


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Content-Type,Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});


const cloudinaryConfiguration = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}


//test call
app.get("/", (req, res) => res.send("Server Running"))

//User Routes
app.post("/users/signup", userController.SignUp);
app.post("/users/login", userController.Login);
app.post("/users/:uuid/editProfile", AuthMiddleware.authenticateUser, userController.EditProfileDetails);
app.get("/users/:uuid/getProfile", AuthMiddleware.authenticateUser, userController.GetProfileDetails);
app.post("/users/:uuid/changePassword", AuthMiddleware.authenticateUser, userController.ChangePassword);

//accounts Routes
app.get("/accounts/users/:uuid/getAccounts", AuthMiddleware.authenticateUser, accountsController.getAccounts);
app.post("/accounts/addCard", AuthMiddleware.authenticateUser, accountsController.addCardDetails);
app.post("/accounts/:id/deleteAccounts", AuthMiddleware.authenticateUser, accountsController.deleteAccounts);
app.put("/accounts/:id/editAccounts", AuthMiddleware.authenticateUser, accountsController.editAccounts);


//customer Routes

app.post("/customers/addCustomer", AuthMiddleware.authenticateUser, customersController.addCustomer);
app.put("/customers/:customer_id/editCustomer", AuthMiddleware.authenticateUser, customersController.editCustomer);
app.post("/customers/deleteCustomer", AuthMiddleware.authenticateUser, customersController.deleteCustomer);
app.get("/customers/users/:user_id/getCustomers", AuthMiddleware.authenticateUser, customersController.getCustomer);
app.get("/customers/:customer_id/getCustomerById", AuthMiddleware.authenticateUser, customersController.getCustomerById);

//product Routes

app.post("/products/addProduct", AuthMiddleware.authenticateUser, productsController.addProduct);
app.put("/products/:product_id/editProduct", AuthMiddleware.authenticateUser, productsController.editProduct);
app.post("/products/deleteProduct", AuthMiddleware.authenticateUser, productsController.deleteProduct);
app.get("/products/users/:user_id/getProducts", AuthMiddleware.authenticateUser, productsController.getProduct);
app.get("/products/:product_id/getProductById", AuthMiddleware.authenticateUser, productsController.getProductById);



app.listen(process.env.PORT || 5000, async () => {
  await sequelize.authenticate().then((res) => {
    console.log("Authenticated");
    console.log("Server connected at port: ",process.env.PORT || 5000);
    cloudinaryConfiguration();
  });
});
