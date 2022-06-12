'use strict';
/**
** @author : Vinod Kumar Tarkar
* @description : todo model
** @filename : todo.js
** @created : 11-Jun-2022
**/

const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var todoSchema = new Schema({
	name: {
		type: String
	},
	title: {
		type: String
	},
	country: {
		type: String
	},
	description: {
		type: String
	},
	status: {
        type: Boolean,
        default: true
    },
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
},{collection :'todo'});
module.exports = mongoose.model('todo', todoSchema);
