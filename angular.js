#!/usr/bin/env node
'use strict';

var fs = require('fs');
var YAML = require('yamljs');
var program = require('commander');
var meta = require('./lib/meta');

program
  .version(meta.VERSION)
  .usage('[options] -f <swagger file> -o <output>')
  .option('-f, --file [file]', 'Path to swagger file', 'swagger.yaml')
  .option('-o, --output [output]', 'Path to output file', 'lib/api/angularFestivalsApi.js')
  .parse(process.argv);

var CodeGen = require('swagger-js-codegen').CodeGen;

YAML.load(program.file, function (swaggerDocs) {

  if (swaggerDocs === null) {
    throw new Error('Invalid file path: ' + program.file);
  }

  if (!program.output) {
    throw new Error('Invalid output path: ' + program.output);
  }

  var angular = CodeGen.getCustomCode(
    {
      className: 'FestivalsApi',
      swagger: swaggerDocs,
      template: {
        class: fs.readFileSync('templates/angular/angular-class.mustache', 'utf-8'),
        method: fs.readFileSync('templates/angular/method.mustache', 'utf-8'),
        request: fs.readFileSync('templates/angular/angular-request.mustache', 'utf-8')
      }
    }
  );

  fs.writeFile(program.output, angular, function (err) {
    if (err) {
      throw err;
    }

    console.log('ok');
  });
});
