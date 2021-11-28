var jwt = require("jsonwebtoken");
const { accounts } = require("../../models");

const addCardDetails = async (req, res) => {
  const { accNo, accTitle, bankName, cardNo } = req.body.data;
    try {
      let result = await accounts.create({
        acc_no: accNo,
        email: decodedJWT,
        acc_title: accTitle,
        bank_name: bankName,
        card_no: cardNo,
      });
      if (result) {
        res.send({
          message: "success",
        });
      } else {
        res.status(500).send({
          message: "Unable to Add Card Details",
        });
      }
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
};

const getAccounts = async (req, res) => {
    const uuid = req.params.uuid 
    try {
      const result = await accounts.findAll({
        where: { uuid },
      });
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
    }
};

const deleteAccounts = async (req, res) => {
  const { id } = req.body.data;
    try {
      let result = await accounts.destroy({ where: { id: id } });
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
    }
};

const editAccounts = async (req, res) => {
  const { accNo, accTitle, bankName, cardNo, id } = req.body.data;

    try {
      let result = await accounts.update(
        {
          acc_no: accNo,
          acc_title: accTitle,
          bank_name: bankName,
          card_no: cardNo,
        },
        { where: { id: id } }
      );
      if (result) {
        res.send({ message: "success" });
      } else {
        res.send({
          message: "DBError",
        });
      }
    } catch (err) {
      console.log(err);
    }
};

module.exports = {
  addCardDetails,
  getAccounts,
  deleteAccounts,
  editAccounts,
};
