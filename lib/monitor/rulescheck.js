'use strict';

const log = load('/lib/utils/log.js');
const co = load('co');
const process = load('child_process');

let lastCommitObj;

let DeployConfig;

function GitCall(command) {
	return new Promise((resove) => {
		log.debug('exec:' + `cd ${DeployConfig.localdir} && ${command}`);
		process.exec(`cd ${DeployConfig.localdir} && ${command}`, function(error, msg, stderr) {
			if (error) {
				//reject(error);
			}
			resove(`${msg} ${stderr}`);
		});
	});
}

function GetCommits() {
	return new Promise((resove) => {
		co(function*() {
			yield GitCall('git fetch --all');
			let msg = yield GitCall(`git log remotes/origin/${DeployConfig.branch}`);

			let commitRegex = /Author:\s*([^<]+)[\s\S]+?Date\s*:\s*([\s\S]+?)\n\S*\s*([\s\S]+?)\n/g;
			let result;
			let commits = [];
			while (result = commitRegex.exec(msg)) {
				commits.push({
					author: result[1],
					date: new Date(result[2]).valueOf(),
					msg: result[3]
				});
			}
			resove(commits);
		});
	});
}

function GetTags() {
	return new Promise((resove) => {
		co(function*() {
			let msg = yield GitCall('git fetch --all');

			let tagRegex = /\[new\s*tag\][\s\S]+?->\s*([\s\S]+?)\n/ig;
			let result;
			let tags = [];
			while (result = tagRegex.exec(msg)) {
				tags.push(result[1]);
			}
			resove(tags);
		});
	});
}

module.exports = {
	check: (config) => {
		return new Promise((resove) => {
			DeployConfig = config;
			co(function*() {
				let cmts = [];
				let tags = [];

				function matchRule() {
					resove(true);
					return;
				}

				function unmatchRule() {
					resove(false);
					return;
				}
				for (let rule of DeployConfig.rules) {
					switch (rule.type) {
						case 'commit':
							cmts = cmts.length === 0 ? yield GetCommits() : cmts;
							for (let cmt of cmts) {
								if (lastCommitObj && lastCommitObj.date === cmt.date) {
									unmatchRule();
									break;
								}
								if (new RegExp(rule.value).test(cmt.msg)) {
									lastCommitObj = cmts[0];
									matchRule();
									break;
								}
							}
							break;
						case 'tag':
							tags = tags.length === 0 ? yield GetTags() : tags;
							for (let tag of tags) {
								if (new RegExp(rule.value).test(tag)) {
									matchRule();
									break;
								}
							}
							break;
					}
				}
				
				unmatchRule();
			});
		});
	}
};