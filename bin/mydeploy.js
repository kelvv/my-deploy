#!/usr/bin/env node

'use strict';

var mydeploy   = require('../lib');
var option     = require('../cli/parse').parse(process.argv);
var pkg        = require('../package.json');

if(option.args.length === 0) option.help();

mydeploy(option);

require('update-notifier')({pkg}).notify(); 
