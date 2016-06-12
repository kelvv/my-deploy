const clc       = load('colors-cli');
const log4js    = load('log4js');
log4js.configure({
    appenders   :  load('/config/log')
});

const logger = log4js.getLogger('app');

function log(msg){
    logger.info(msg);
}

log.error = (msg)=>{
    logger.error(clc.red(msg));
}

log.warn = (msg)=>{
    logger.warn(clc.yellow(msg));
}

log.notice = (msg)=>{
    logger.info(clc.blue(msg));
}

log.success = (msg)=>{
    logger.info(clc.green(msg));
}

module.exports = log;