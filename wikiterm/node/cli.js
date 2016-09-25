#!/usr/bin/env node

"use strict";

const yargs = require('yargs');
const inquirer = require('inquirer');
const ora = require('ora');
const request = require('request');
const fs = require('fs');

const API_URL = require('./constants').API_URL;

const logDataToFile = (filePath, data) => {
  fs.access(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.closeSync(fs.openSync(filePath, 'a'));
      } else {
        throw err;
      }
    }
    
    fs.appendFileSync(filePath, data, 'utf8');
    console.log('Done!');
  });
};

/**
 * @param {String} phoneNumber Phone number to be checked
 * @return undefined
 */
const logLink = (query, logFileName) => {
  const spinner = ora('Fetching data').start();
  const config = {
    "action": "opensearch",
    "format": "json",
    "namespace": 0,
    "limit": 1,
    "profile": "fuzzy",
    "search": query
  };

  request.get({ url: API_URL, qs: config }, (err, res, body) => {
    if(err) {
      spinner.stop();
    }
    else {
      spinner.stop();
      const data = JSON.parse(body);
      const searchLinks = data[3];
      if (searchLinks.length === 0) {
        console.log("No link found!");
      }
      else {
        if(logFileName === undefined || logFileName === "") {
          logDataToFile(`${process.cwd()}/links.log`, `${searchLinks[0]}\n`);
        }
        else {
          logDataToFile(logFileName, `${searchLinks[0]}\n`);
        }
      }
    }
  });
};

/**
 * Command line interface code for the app
 */
const argv = yargs
  .usage('Usage: $0 -s [string]')
  .option('s', {
    alias: 'search',
    describe: 'String to be searched',
    type: 'string'
  })
  .option('f', {
    alias: 'file',
    describe: 'Path of file where log needs to be stored',
    type: 'string'
  })
  .help('h')
  .alias('h', 'help')
  .argv;

// Collect search term passed from argument
const search_term = argv.search;

// Collect filename passed from argument
const log_filename = argv.file;

/**
 * Check if no input was passed through CLI mode
 */
if (search_term === undefined) {

  /**
   * Array of objects asking questions to user for input
   * @type {Array}
   */
  const questions = [{
    type: 'input',
    name: 'search_term',
    message: 'Please enter a search term',
    validate: (input) => {
      if (input === "") {
        return false;
      }
      return true;
    }
  } , {
    type: 'input',
    name: 'log_filename',
    message: 'Please enter a file name <Leave Blank for default>'
  }];

  /**
   * Prompt questions to user and get answer to process
   */
  inquirer.prompt(questions).then((answers) => {
    logLink(answers.search_term, answers.log_filename);
  });
}
else {
  /**
   * Log the link for the given search term
   */
  logLink(search_term, log_filename);
}
