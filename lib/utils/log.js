'use strict'

const log4js = require( 'log4js' );

log4js.configure( {
	appenders: load( '/config/log' )
} );

module.exports = {
    get : name =>{
        let logger = log4js.getLogger(name);
        logger.setLevel( 'INFO' );
        if ( process.env.NODE_ENV === 'development' ) logger.setLevel( 'TRACE' );
        return logger;
    }
};