const express = require("express");
const userController = require("./src/controllers/usersController");
const accountsController = require("./src/controllers/accountsController");
const customersController = require("./src/controllers/customersController");
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
app.post("/users/editProfile", AuthMiddleware.authenticateUser, userController.EditProfileDetails);
app.get("/users/:uuid/getProfile", AuthMiddleware.authenticateUser, userController.GetProfileDetails);
app.post("/users/changePassword", AuthMiddleware.authenticateUser, userController.ChangePassword);

//accounts Routes
app.post("/accounts/addCard", AuthMiddleware.authenticateUser, accountsController.addCardDetails);
app.get("/accounts/getAccounts", AuthMiddleware.authenticateUser, accountsController.getAccounts);
app.post("/accounts/deleteAccounts", AuthMiddleware.authenticateUser, accountsController.deleteAccounts);
app.post("/accounts/editAccounts", AuthMiddleware.authenticateUser, accountsController.editAccounts);


//customer Routes

app.post("/customers/addCustomer", AuthMiddleware.authenticateUser, customersController.addCustomer);
app.get("/customers/getCustomers", AuthMiddleware.authenticateUser, customersController.getCustomer);



app.listen(process.env.PORT || 5000, async () => {
  await sequelize.authenticate().then((res) => {
    console.log("Authenticated")
    cloudinaryConfiguration();
  });
});
