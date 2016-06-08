'use strict';

const fs      	= load('fs');
const path    	= load('path');
const log     	= load('/lib/utils/log');
const http    	= load('http');
const env 	   	= load('/config/env');
const hook		= load('/lib/monitor/hook.js');
const watch 	= load('/lib/monitor/watch');


function mydeploy(settings){
	return mydeploy;
}

mydeploy.start = (option) => {
	option.config = option.config || path.join(process.cwd(),'mydeploy.json');
	option.port   = option.port   || env.PORT;
	let config = require(option.config);
	http.createServer((req,res)=>{
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.end('');
		if(req.url === '/' ) hook.beat();
	}).listen(option.port);

	switch(config.mode){
		case "webhook":
			hook.start(config);
			break;
		case "watch":
			watch.start(config);
			break;
	}

	log.success(`mydeploy is running at http://127.0.0.1:${option.port}/`);
}

mydeploy.init = () => {
	fs.writeFileSync(
		path.join(process.cwd(),'mydeploy.json'),
		fs.readFileSync(path.join(__dirname,'/cli/mydeploy.template'))
	);
	log.success('mydeploy.json init Successfully!')
}


module.exports = mydeploy;