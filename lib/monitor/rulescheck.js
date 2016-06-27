'use strict';

const co = load( 'co' );
const log = load( '/lib/utils/log' ).get( 'app' );
const gitcommand = load( '/lib/utils/gitcommand' );

let lastCommitObj;

let DeployConfig;

function GetCommits() {
	return new Promise( ( resove ) => {
		co( function*() {
			yield gitcommand.GitCall( 'git fetch --all' , DeployConfig.localdir );
			let msg = yield gitcommand.GitCall( `git log remotes/origin/${DeployConfig.branch}` ,DeployConfig.localdir );

			let commitRegex = /Author:\s*([^<]+)[\s\S]+?Date\s*:\s*([\s\S]+?)\n\S*\s*([\s\S]+?)\n/g;
			let result;
			let commits = [];
			while ( result = commitRegex.exec( msg ) ) {
				commits.push( {
					author: result[1],
					date: new Date( result[2] ).valueOf(),
					msg: result[3]
				} );
			}
			resove( commits );
		} );
	} );
}

function GetTags() {
	return new Promise( ( resove ) => {
		co( function*() {
			let msg = yield gitcommand.GitCall( 'git fetch --all' , DeployConfig.localdir );

			let tagRegex = /\[new\s*tag\][\s\S]+?->\s*([\s\S]+?)\n/ig;
			let result;
			let tags = [];
			while ( result = tagRegex.exec( msg ) ) {
				tags.push( result[1] );
			}
			resove( tags );
		} );
	} );
}

module.exports = {
	check: ( config ) => {
		return new Promise( ( resove ) => {
			DeployConfig = config;
			co( function*() {
				let cmts = [];
				let tags = [];

				function matchRule() {
					resove( true );
					return;
				}

				function unmatchRule() {
					resove( false );
					return;
				}
				for ( let rule of DeployConfig.rules ) {
					let envEnable = true;
					if( rule.env ){
						for( let item of rule.env ){
							let key = item.match( /^[^=]+/ )[0];
							let value = item.match( /[^=]+$/ )[0];
							log.debug('check env:'+key);
							if( !process.env[key]||process.env[key]!==value ){
								log.debug('env not matched');
								envEnable=false;
								break;
							}
							log.debug('env  matched');
						}
					}
					if( !envEnable ){
						break;
					}
					switch ( rule.type ) {
						case 'commit':
							cmts = cmts.length === 0 ? yield GetCommits() : cmts;
							for ( let cmt of cmts ) {
								if ( lastCommitObj && lastCommitObj.date === cmt.date ) {
									unmatchRule();
									break;
								}
								if ( new RegExp( rule.value ).test( cmt.msg ) ) {
									lastCommitObj = cmts[0];
									matchRule();
									break;
								}
							}
							break;
						case 'tag':
							tags = tags.length === 0 ? yield GetTags() : tags;
							for ( let tag of tags ) {
								if ( new RegExp( rule.value ).test( tag ) ) {
									matchRule();
									break;
								}
							}
							break;
					}
				}
				
				unmatchRule();
			} );
		} );
	}
};