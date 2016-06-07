'use strict';

function mydeploy(settings){
	console.log( settings) 
	return mydeploy;
}

mydeploy.start = (dir) => {
	console.log(dir);
}

mydeploy.init = (dir) => {
	
}


module.exports = mydeploy;