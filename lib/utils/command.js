const process = load( 'child_process' );

module.exports = {
    exec: ( command ) => {
        return new Promise( ( resove ) => {
            process.exec( command, ( error, msg, stderr ) => {
                if ( error ) {
                    //reject(error);
                }
                resove( `${msg} ${stderr}` );
            } );
        } );
    }
};