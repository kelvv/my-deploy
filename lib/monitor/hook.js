const log   = load('/lib/utils/log');
const Repo  = load('git-tools');

let hookList = [];

let repo = {};

function hook(name) {

};

hook.start = (config) =>{
    hookList.push(config);
    repo = new Repo(config.localdir);
};

hook.beat = (req) =>{
    let localdir = hookList[0].localdir;
    let url      = hookList[0].url;
    repo.exec('pull',function( error, authors ) {
        console.log( authors );
    });
}

module.exports = hook;