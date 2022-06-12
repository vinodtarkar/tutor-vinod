'use strict';

/**
** @author : Vinod Kumar Tarkar
** @description : crud routes
** @filename : crud.js
** @created : 11-Jun-2022
**/

const curlCtrl = require("../controllers/crudCtrl");
const {authenticateJWT , generateToken} = require("../helpers/jwt-authentication")

module.exports = function (router) {
    router.get('/test',authenticateJWT, curlCtrl.test);
    router.post('/create',authenticateJWT, curlCtrl.createToDo);
    router.get('/list',authenticateJWT, curlCtrl.getToDoList);
    router.get('/:todo_id',authenticateJWT, curlCtrl.getToDoById);
    router.patch('/update/:todo_id',authenticateJWT, curlCtrl.updateToDoById);
    router.delete('/delete/:todo_id',authenticateJWT, curlCtrl.deleteToDoById);
    router.post('/generateToken', generateToken);
    
}