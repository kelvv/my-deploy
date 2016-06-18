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
    console.log('    start options:');
    console.log('       -s, --sourcepath  the source path you want to deploy');
	console.log('       -c, --config      config file path');
	console.log('       -p, --port        my-deploy port');

	console.log();

	console.log('    init options:');
    console.log('       -l, --localdir  the source path you want to deploy');
	console.log('       -u, --url       the url link to your project');

	console.log();
	
    console.log('  Examples:');
    console.log();
    console.log('    $ start -s /path/to/your/project -p 3000');
    console.log();
  });

module.exports = program;
