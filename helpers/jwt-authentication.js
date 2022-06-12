'use strict';
/**
 ** @author : Vinod Kumar Tarkar
 ** @description : JWT Authentication
 ** @filename : jwt-authentication.js
 ** @created : 11-Jun-2022
 **/

const jwt = require('jsonwebtoken');
const commonFunction = require('./commonFunction');
const jwtKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtKey, (err, user) => {
            if (err) {
                console.log('error------>', err);
                commonFunction.sendResponse(403, false, null, function(response) {
                    res.json(response);
                });
                return;
            } else {
                req.user = user;
                next();
            }

        });
    } else {
        commonFunction.sendResponse(401, false, null, function(response) {
            res.json(response);
        });
    }
};

const generateToken = (req, res) => {
    try {
        let email = req.body.email ? req.body.email : '';
        let password = req.body.password ? req.body.password : '';
        const payloadData = {
            email: email,
            password: password
        }
        const token = jwt.sign(payloadData, jwtKey, {
            algorithm: "HS256",
        })
        commonFunction.sendResponse(200, true, { token: token }, function(response) {
            res.json(response);
        });
    } catch (e) {
        console.log(`Error:  >>> `, e);
        commonFunction.sendResponse(500, false, null, function(response) {
            res.json(response);
        });
    }
}

module.exports = {
    authenticateJWT,
    generateToken
};