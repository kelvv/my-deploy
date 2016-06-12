#!/usr/bin/env node

'use strict';

var mydeploy   = require('../lib');
var option     = load('../cli/parse').parse(process.argv);
var pkg        = load('../package.json');
if(option.args.length === 0) option.help();

mydeploy(option);

require('update-notifier')({pkg}).notify(); 
