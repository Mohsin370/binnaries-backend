const Pool = require('../Models/db');
var jwt = require("jsonwebtoken");

const addCardDetails = async (req, res) => {
    const { accNo, accTitle, bankName, cardNo ,token } = req.body.data;
    let decodedJWT = jwt.verify (token, process.env.JWT_SECRET, function (err, decoded) {
        return decoded;
    });
    if (decodedJWT){
        const result = await Pool.query(`INSERT INTO public.accounts(email,acc_no,acc_title,bank_name, card_no )VALUES ('${decodedJWT}','${accNo}','${accTitle}','${bankName}','${cardNo}')`);
        if (result) {
            res.send({
                message: "success"
            })
        } else {
            res.send({
                message: "DBError"
            })
        }
    }else{
        res.send({
            message: "invalid_token"
        })
    }
}

const getAccounts = async (req, res) => {
    // const token = req.body.data.token;
    const token ='eyJhbGciOiJIUzI1NiJ9.bW9oc2luaWphejEzQGdtYWlsLmNvbQ.e1sciqZsNfH8Wk8nfNk9D0kH2mUxYAr8WtN-9Sel2bI'
    let decodedJWT = jwt.verify (token, process.env.JWT_SECRET, function (err, decoded) {
        return decoded;
    });
    if (decodedJWT){
        const result = await Pool.query(`SELECT * FROM public.accounts WHERE EMAIL = '${decodedJWT}'`);
        if (result.rows.length>0) {
            res.send({
                message: "success",
                accounts:result.rows,
            })
        } else {
            res.send({
                message: "DBError"
            })
        }
    }else{
        res.send({
            message: "invalid_token"
        })
    }
}



module.exports = {
    addCardDetails,
    getAccounts,
}