const express = require("express");
const userController = require("./src/controllers/usersController");
const accountsController = require("./src/controllers/accountsController");
const { sequelize } = require("./models");
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
require("dotenv").config();


//test call
app.get("/",(req,res)=>res.send("Server Running"))

//User Routes
app.post("/users/signup", userController.SignUp);
app.post("/users/login", userController.Login);

//accounts Routes
app.post("/accounts/addCard", accountsController.addCardDetails);
app.get("/accounts/getAccounts", accountsController.getAccounts);
app.post("/accounts/deleteAccounts", accountsController.deleteAccounts);
app.post("/accounts/editAccounts", accountsController.editAccounts);



app.listen(process.env.PORT || 4000, async () => {
  await sequelize.authenticate().then((res) => {});
});
