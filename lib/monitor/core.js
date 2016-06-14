'use strict';
const log  	      = load('/lib/utils/log');
const Repo  	  = load('git-tools');
const rulesCheck  = require('./rulescheck');
const co          = require('co');

let repo = {};
let repConfig ;
let isUpdating = false;

module.exports = {
    start : (config)=>{
        log.debug(config);
        repo = new Repo(config.localdir);
        repConfig = config;
    },
    beat : ()=>{
        return new Promise((resove,reject) => {
            co(function* (){
                if(isUpdating){
                    log.info('is updating,pease wait');
                    return;
                }

                log.debug('check rules');
                //1. checkout
                let isNeed = yield rulesCheck.check(repConfig).catch(function(err){
                    log.error(err);
                });
                if(!isNeed){
                    log.info('dont neet update');
                    resove('dont neet update');
                    return;
                };

                log.debug('end check');

                log.debug('begin update code')
                isUpdating=true;
                repo.exec('pull',function( error, msg ) {
                    isUpdating=false;
                    console.log( msg );
                    log.debug('end update');
                    resove(msg);
                });
            })
        })
    }
}