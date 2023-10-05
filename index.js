const express = require("express");
const cors = require('cors');
const pdfRouter = require("./routes/pdfgenerator")
const bodyParser = require('body-parser')

require("dotenv").config()
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json())
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use("/", pdfRouter)

// mongoose.connect(process.env.DB_CONNECTION_URL, () => {
//    console.log("Connected to db")
// });

app.listen(process.env.PORT, () => {
   console.log("server is running...");
});