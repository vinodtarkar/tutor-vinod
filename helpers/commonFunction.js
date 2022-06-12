'use strict';
const statusCodeMsg = require('./statusCodeMsg');

module.exports = {

	sendResponse: function (codeRes, statusRes, resultRes, cb) {
		if (statusRes) {
			cb({
				code: codeRes,
				message: statusCodeMsg[codeRes],
				status: statusRes,
				results: resultRes
			});
		} else {
			cb({
				code: codeRes,
				message: statusCodeMsg[codeRes],
				status: statusRes
			})
		}
	}

};
