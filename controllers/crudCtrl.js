const commonFunction = require('./../helpers/commonFunction');
const toDo = require('./../models/todo');

const test = (req, res) => {
    console.log('***** test *****');
    commonFunction.sendResponse(200, true, 'test successfully!', function (response) {
        res.json(response);
    });
}

const getToDoList = function (req, res) {
    try {
        console.log('***** get todo list *****');
        let findQuery = {};
        toDo.find(findQuery).lean().exec(function (err, todo_list) {
            if (err) {
                commonFunction.sendResponse(400, false, null, function (response) {
                    res.json(response);
                });
            } else {
                console.log('todo_list : ', todo_list);
                if (todo_list.length > 0) {
                    commonFunction.sendResponse(200, true, todo_list, function (response) {
                        res.json(response);
                    });
                } else {
                    commonFunction.sendResponse(512, false, null, function (response) {
                        res.json(response);
                    });
                }
            }
        })
    } catch (err) {
        console.log(`Error:  >>> `, err);
        commonFunction.sendResponse(500, false, null, function (response) {
            res.json(response);
        });
    }
}

const createToDo = function (req, res) {
    try {
        console.log('***** create ToDo *****');
        const {
            name,
            title,
            country,
            description
        } = req.body;
        var toDoAdd = new toDo({
            name: name,
            title: title,
            country: country,
            description: description
        });
        toDoAdd.save((err, todo) => {
            if (err) {
                commonFunction.sendResponse(500, false, null, function (response) {
                    res.json(response);
                });
            } else {
                commonFunction.sendResponse(201, true, todo, function (response) {
                    res.json(response);
                });
            }
        });
    } catch (err) {
        console.log(`Error:  >>> `, err);
        commonFunction.sendResponse(500, false, null, function (response) {
            res.json(response);
        });
    }
}

const getToDoById = function (req, res) {
    try {
        console.log('***** get ToDo By Id *****');
        const { todo_id } = req.params;
        let findQuery = {
            _id: todo_id
        }
        toDo.findOne(findQuery).lean().exec(function(err, result) {
            if (err) {
                console.log(err);
                commonFunction.sendResponse(400, false, null, function(response) {
                    res.json(response);
                });
            } else {
                commonFunction.sendResponse(200, true, result, function(response) {
                    res.json(response);
                });
            }
        });
    } catch (err) {
        console.log(`Error:  >>> `, err);
        commonFunction.sendResponse(500, false, null, function (response) {
            res.json(response);
        });
    }
}

const updateToDoById = function (req, res) {
    try {
        console.log('***** update ToDo By Id *****');
        const { todo_id } = req.params;
        let findQuery = {
            _id: todo_id
        }
        const {
            name,
            title,
            country,
            description
        } = req.body;
        toDo.findOneAndUpdate(findQuery, {
            name: name,
            title: title,
            country: country,
            description: description
        }).exec(function(err, result) {
            if (err) {
                console.log(err);
                commonFunction.sendResponse(400, false, null, function(response) {
                    res.json(response);
                });
            } else {
                commonFunction.sendResponse(202, true, result, function(response) {
                    res.json(response);
                });
            }
        });
    } catch (err) {
        console.log(`Error:  >>> `, err);
        commonFunction.sendResponse(500, false, null, function (response) {
            res.json(response);
        });
    }
}

const deleteToDoById = function (req, res) {
    try {
        console.log('***** delete ToDo By Id *****');
        const { todo_id } = req.params;
        let findQuery = {
            _id: todo_id
        }
        toDo.findOneAndDelete(findQuery).exec(function(err, result) {
            if (err) {
                console.log(err);
                commonFunction.sendResponse(400, false, null, function(response) {
                    res.json(response);
                });
            } else {
                commonFunction.sendResponse(200, true, result, function(response) {
                    res.json(response);
                });
            }
        });
    } catch (err) {
        console.log(`Error:  >>> `, err);
        commonFunction.sendResponse(500, false, null, function (response) {
            res.json(response);
        });
    }
}

module.exports = {
    test,
    getToDoList,
    createToDo,
    getToDoById,
    updateToDoById,
    deleteToDoById
}