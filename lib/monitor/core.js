'use strict';
const log = load( '/lib/utils/log' );
const rulesCheck = load( '/lib/monitor/rulescheck' );
const co = load( 'co' );
const gitcommand = load('/lib/utils/gitcommand');

let repConfig;
let isUpdating = false;

module.exports = {
	start: ( config ) => {
		return new Promise( ( resove, reject ) => {
			co( function*() {
				log.debug( config );
				repConfig = config;
				let msg = yield gitcommand.GitCall(`git checkout ${repConfig.branch}`,repConfig.localdir);
				resove(msg);
			})
		});
	},
	beat: () => {
		return new Promise( ( resove, reject ) => {
			co( function*() {
				if ( isUpdating ) {
					log.info( 'is updating,pease wait' );
					return;
				}

				log.debug( 'check rules' );
				//1. checkout
				let isNeed = yield rulesCheck.check( repConfig ).catch( function( err ) {
					log.error( err );
				} );
				if ( !isNeed ) {
					log.info( 'dont neet update' );
					resove( 'dont neet update' );
					return;
				}

				log.debug( 'end check' );

				log.debug( 'begin update code' );
				isUpdating = true;
				let msg = yield gitcommand.GitCall(`git pull origin ${repConfig.branch}`,repConfig.localdir)
				isUpdating = false;
				log.debug( 'end update' );
				resove( msg );
				log.info( msg );
			} );
		} );
	}
};