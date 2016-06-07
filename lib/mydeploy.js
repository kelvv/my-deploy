'use strict';

const fs    = require('fs');
const path  = require('path');
const log   = console.log;

function mydeploy(settings){
	//console.log( settings) 
	return mydeploy;
}

mydeploy.start = (dir) => {
	log(dir);
}

mydeploy.init = (dir) => {
	fs.writeFileSync(
		path.join(dir,'mydeploy.json'),
		fs.readFileSync(path.join(__dirname,'../doc/cli/mydeploy.template'))
	);
}


module.exports = mydeploy;