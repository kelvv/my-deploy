const clc = load('colors-cli');

function log(msg){
    console.log(msg);
}

log.error = (msg)=>{
    log(clc.red.bold(msg));
}

log.warn = (msg)=>{
    log(clc.yellow(msg));
}

log.notice = (msg)=>{
    log(clc.blue(msg));
}

log.success = (msg)=>{
    log(clc.green(msg));
}

module.exports = log;