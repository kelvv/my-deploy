const process = load( 'child_process' );
const log     = load( '/lib/utils/log' );

module.exports = {
    GitCall: ( command , dir ) => {
	return new Promise( ( resove ) => {
		log.debug( 'exec:' + `cd ${dir} && ${command}` );
		process.exec( `cd ${dir} && ${command}`, function( error, msg, stderr ) {
			if ( error ) {
				//reject(error);
			}
			resove( `${msg} ${stderr}` );
		} );
	} );
}
};