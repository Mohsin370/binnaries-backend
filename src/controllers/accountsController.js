const { Accounts } = require("../../models");

const addCardDetails = async (req, res) => {
  const { accNo, accTitle, bankName, cardNo, uuid } = req.body.data;
  try {
    let result = await Accounts.create({
      acc_no: accNo,
      acc_title: accTitle,
      bank_name: bankName,
      card_no: cardNo,
      user_id: uuid,
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
  const uuid = req.params.uuid;
  try {
    const result = await Accounts.findAll({
      where: { user_id: uuid },
    });
    if (result) {
      res.send({
        message: "success",
        accounts: result,
      });
    } else {
      res.statu(500).send({
        message: "Could not get accounts",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Could not get accounts",
    });
  }
};

const deleteAccounts = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await Accounts.destroy({ where: { id } });
    if (result) {
      res.send({
        message: "success",
      });
    } else {
      res.send({
        message: "DBError",
      });
    }
  } catch (error) {
    res.status(500).send({error});
    console.log(error);
  }
};

const editAccounts = async (req, res) => {
  const { accNo, accTitle, bankName, cardNo } = req.body.data;
  const id = req.params.id;

  try {
    let result = await Accounts.update(
      {
        acc_no: accNo,
        acc_title: accTitle,
        bank_name: bankName,
        card_no: cardNo,
      },
      { where: { id } }
    );
    if (result) {
      res.send({ message: "success" });
    } else {
      res.send({
        message: "DBError",
      });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = {
  addCardDetails,
  getAccounts,
  deleteAccounts,
  editAccounts,
};
