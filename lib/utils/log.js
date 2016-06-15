const clc = load('colors-cli');
const log4js = load('log4js');
log4js.configure({
	appenders: load('/config/log')
});


const logger = log4js.getLogger('app');
logger.setLevel('INFO');

if (process.env.DEBUG) logger.setLevel('TRACE');


function log(msg) {
	logger.info(msg);
}

log.error = (msg) => {
	logger.error(clc.red(msg));
};

log.warn = (msg) => {
	logger.warn(clc.yellow(msg));
};

log.info = (msg) => {
	logger.info(clc.blue(msg));
};

log.success = (msg) => {
	logger.info(clc.green(msg));
};

log.debug = (msg) => {
	logger.debug(clc.white(msg));
};

module.exports = log;