const path    = require('path');
require('./utils/stringex');

global.load = (url)=>{
    if(url.startsWith('/')){
        return require(path.join(`${process.cwd()}`,url));
    }else{
        return require(url);
    }
};

module.exports = require('./mydeploy');
