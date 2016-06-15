'use strict';
const log = load( '/lib/utils/log' );
const core = load( '/lib/monitor/core' );
const co = load( 'co' );

module.exports = {
	start: ( config ) => {
		function pullTask() {
			co( function*() {
				yield core.beat();

				setTimeout( pullTask, config.interval );
			} );
		}

		core.start( config ).then(()=>{
			log.debug( 'begin interval pull' );
			setTimeout( pullTask, config.interval );
		});;
	}
};