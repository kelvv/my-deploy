'use strict';

const fs      	= load('fs');
const path    	= load('path');
const log     	= load('/lib/utils/log');
const http    	= load('http');
const env 	   	= load('/config/env');
const hook		= load('/lib/monitor/hook.js');
const watch 	= load('/lib/monitor/watch');
const jsonfile  = load('jsonfile');


function mydeploy(settings){
	return mydeploy;
}

mydeploy.start = (option) => {
	option.config = option.config || path.join(process.cwd(),'mydeploy.json');
	if(!fs.existsSync(option.config)){
		log.error(`can't find mydeploy.json file in ${path.dirname(option.config)}`);
		log.warn('you can use init command to create one')
		return;
	}
	option.port   = option.port   || env.PORT;
	let config = require(option.config);
	
	if(!fs.existsSync(config.localdir)){
		log.error(`can't find localdir in mydeploy.json `);
		log.warn('you need to check it out ~.~! ')
		return;
	}

	http.createServer((req,res)=>{
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.end('got');
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

mydeploy.init = (option) => {
	let deployConfig = jsonfile.readFileSync(path.join(__dirname,'/cli/mydeploy.template'));
	if(option.url) deployConfig.url = option.url;
	if(option.localdir) deployConfig.localdir = option.localdir;
	jsonfile.writeFileSync(
		path.join(process.cwd(),'mydeploy.json')
		, deployConfig ,{spaces: 4})

	log.success('mydeploy.json init Successfully!')
}


module.exports = mydeploy;