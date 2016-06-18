'use strict';

const fs = load( 'fs' );
const path = load( 'path' );
const log = load( '/lib/utils/log' ).get( 'app' );
const http = load( 'http' );
const env = load( '/config/env' );
const hook = load( '/lib/monitor/hook.js' );
const watch = load( '/lib/monitor/pullwatch' );
const jsonfile = load( 'jsonfile' );



function mydeploy() {
	return mydeploy;
}

mydeploy.start = ( option ) => {
	option.config = option.config || path.join( process.cwd(), '.mydeploy.json' );
	if ( !fs.existsSync( option.config ) ) {
		log.error( `can't find .mydeploy.json file in ${path.dirname( option.config )}` );
		log.warn( 'you can use init command to create one' );
		return;
	}
	option.port = option.port || env.PORT;
	let config = require( option.config );

	if ( !fs.existsSync( config.localdir ) ) {
		log.error( 'can\'t find localdir in .mydeploy.json ' );
		log.warn( 'you need to check it out ~.~! ' );
		return;
	}

	config.url = config.url.replace( /(?:\.git)?$/,'.git' );

	http.createServer( ( req, res ) => {
		res.writeHead( 200, {
			'Content-Type': 'text/plain'
		} );
		res.end( 'server is running' );
	} ).listen( option.port );

	switch ( config.mode ) {
		case 'webhook':
			hook.start( config );
			break;
		case 'pullwatch':
			watch.start( config );
			break;
	}


	log.info( `mydeploy is running at http://127.0.0.1:${option.port}/` );
};

mydeploy.init = ( option ) => {
	let deployConfig = jsonfile.readFileSync( path.join( __dirname, '/cli/.mydeploy.template' ) );
	if ( option.url ) deployConfig.url = option.url;
	if ( option.localdir ) deployConfig.localdir = option.localdir;
	jsonfile.writeFileSync(
		path.join( process.cwd(), '.mydeploy.json' ), deployConfig, {
			spaces: 4
		} );

	log.info( `Successfully created .mydeploy.json file in ${process.cwd()}` );
};


module.exports = mydeploy;