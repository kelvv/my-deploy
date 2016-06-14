'use strict';

const webHandler = load('/lib/utils/webHandler');
const log        = load('/lib/utils/log.js')
const co         = load('co');

let lastCommitObj ;

let commits = [];

function GetCommits(config) {
    return new Promise((resove,reject) => {
        if(commits.length > 0){
            resove(commits) ;
            return ;
        }
        co(function* (){
            let url =config.url.replace(/\.git$/,'/commits/')+config.branch;
            log.debug('begin get html : ' + url);
            let html = yield webHandler.GetHtml(url);
            let commitRegex = /class="commit-title\s*">\s*<a[^>]+>([^<]+)[\s\S]+?commit-author[^"]+"\s+rel="author"\s*>([^<]+)[\s\S]+?datetime="([^"]+)/ig;
            let cms = [];
            let result;
            while(result = commitRegex.exec(html)){
                cms.push ( {
                    msg    : result[1],
                    author : result[2],
                    date   : new Date(result[3]).valueOf()
                } );
            }
            resove(cms);
            commits = cms;
        });
    })
}

module.exports = {
    check : (config)=>{
        return new Promise((resove,reject) => {
            co(function* (){
                for(let rule of config.rules){
                    switch(rule.type){
                        case 'commit':
                            let cmts =yield GetCommits(config);
                            for(let cmt of cmts){
                                if(lastCommitObj && lastCommitObj.date === cmt.date){
                                    resove(false);
                                    break;
                                }
                                if(new RegExp(rule.value).test(cmt.msg)){
                                    resove(true);
                                }
                            }
                        break;
                        case 'tag':

                        break;
                    }
                }
                if(!lastCommitObj) resove(false);
                let cms = yield GetCommits(config)
                lastCommitObj = cms[0];
                commits = [];
            });
        })
    }
}