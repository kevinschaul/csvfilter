#!/usr/bin/env node

var async = require('async');
var csv = require('csv');
var fs = require('fs');
var minimist = require('minimist');

var args = minimist(process.argv.slice(2));
var filename = args._[0];
var column = args.c;
var filterFunc = args.f;

async.waterfall([
    // Read file from disk
    function(callback) {
        fs.readFile(filename, callback);
    },
    // Parse csv data into objects
    function(csvString, callback) {
        csv.parse(csvString, { columns: true }, callback);
    },
    // Filter based on passed-in filter function
    function(csvData, callback) {
        var filtered = csvData.filter(function(row) {
            var func = 'function filterFunc(d) {' + filterFunc + '}';
            eval(func);
            return filterFunc(row[column]);
        });
        callback(null, filtered);
    },
    // Convert remaining objects into csv data
    function(filteredCsvData, callback) {
        csv.stringify(filteredCsvData, { header: true }, callback);
    }
], function(err, result) {
    // Output csv data
    console.log(result);
});
