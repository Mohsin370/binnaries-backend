const express = require("express");
const userController = require("./src/controllers/usersController");
const accountsController = require("./src/controllers/accountsController");
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


//test call
app.get("/", (req, res) => res.send("Server Running"))

//User Routes
app.post("/users/signup", userController.SignUp);
app.post("/users/login", userController.Login);
app.post("/users/editProfile", userController.EditProfileDetails);
app.post("/users/getProfile", userController.GetProfileDetails);

//accounts Routes
app.post("/accounts/addCard", accountsController.addCardDetails);
app.get("/accounts/getAccounts", accountsController.getAccounts);
app.post("/accounts/deleteAccounts", accountsController.deleteAccounts);
app.post("/accounts/editAccounts", accountsController.editAccounts);



app.listen(process.env.PORT || 4000, async () => {
  await sequelize.authenticate().then((res) => {
    console.log("Authenticated")
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  });
});
