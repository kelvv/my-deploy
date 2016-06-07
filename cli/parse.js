'use strict'

let program  = require('commander');
let pkg		 = require('../package.json');
let mydeploy = require('../lib');

program
	.version(pkg.version);


program
	.command('start <path>')
	.description('path of your project with git')
	.action(mydeploy.start)

program
	.command('init <path>')
	.description('init project - get mydeploy.config')
	.action(mydeploy.start)

module.exports = program;
