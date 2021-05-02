const express = require('express');
const app = express();


app.get('/', (req, res) => {
    console.log("Hello")
    res.send("hello")
})


app.listen(process.env.PORT || 4000);