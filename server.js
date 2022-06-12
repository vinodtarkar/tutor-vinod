const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
const router = express.Router();

require("dotenv").config();

const APPNAME = process.env.APPNAME, PORT = process.env.PORT, DATABASE_URL = process.env.DATABASE_URL;

server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use('/api/v1', router);

server.listen(PORT, (err, res) => {
    if (err) {
        console.log(`\n Server error on ${PORT} \n`);
    } else {
        console.log('\n/*\n|--------------------------------------------------------------------------')
        console.log(`| Server up \n| Running on ${PORT}`)
        console.log('|--------------------------------------------------------------------------\n*/\n')

        console.log('+--------------------+-------------------------+--------------------------+')
        console.log('|    App Name                             App Start Time                  |')
        console.log('+--------------------+-------------------------+--------------------------+')
        console.log('|                                                                         |')
        console.log(`| ${APPNAME}                       ${new Date().toLocaleString()}`)
        console.log('|                                                                         |')
        console.log('+--------------------+-------------------------+--------------------------+\n')

        mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(res => {
            console.log("DB Connected!")
            require('./routes/crudRoute')(router);
            console.log(`Server is listening on port ${PORT}`);
        }).catch(err => {
            console.log("Error while conecting db---->", err);
        })
    }
})