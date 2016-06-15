'use strict';
const request = require('request');

module.exports = {
	GetHtml: (url) => {
		return new Promise((resove, reject) => {
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					resove(body.UnicoToUtf8());
				} else {
					reject(error);
				}
			});
		});
	}
};