'use strict';

const log = load( '/lib/utils/log' );
const core = load( '/lib/monitor/core' );
const http = load( 'http' );

module.exports = {
	start: ( config ) => {
		http.createServer( ( req, res ) => {
			res.writeHead( 200, {
				'Content-Type': 'text/plain'
			} );
			res.end( 'got' );
			if ( req.url === '/' ) core.beat();
		} ).listen( config.port );

		log.info( `webhook is running on prot ${config.port}` );
		core.start( config );
	}
};