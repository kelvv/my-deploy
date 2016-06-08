'use strict'

let program  = load('commander');
let pkg		 = load('../package.json');
let mydeploy = load('../lib');

program
	.version(pkg.version);


program
	.command('start')
	.description('begin service')
	.option('-s, --sourcepath <path>','the source path you want to deploy')
	.option('-c, --config <path>','config file path')
	.option('-p, --port <n>','port')
	.action(mydeploy.start)

program
	.command('init')
	.description('init project - get mydeploy.config')
	.option('-l, --localdir <path>','the source path you want to deploy')
	.option('-u, --url <url>','the url link to your project')
	.action(mydeploy.init)

program.on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ start -s /path/to/your/project');
    console.log();
  });

module.exports = program;
