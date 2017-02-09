#!/usr/bin/env node

const yargs = require('yargs');
const inquirer = require('inquirer');
const validateNumber = require('./helpers').validateNumber;

/**
 * @param {String} phoneNumber Phone number to be checked
 * @return undefined
 */
const checkNumber = (phoneNumber) => {
  if (validateNumber(phoneNumber)) {
    console.log('Valid');
  } else {
    console.log('Invalid');
  }
};

/**
 * Command line interface code for the app
 */
const argv = yargs
  .usage('Usage: $0 -p [num]')
  .option('p', {
    alias: 'phone',
    describe: 'Phone number to be validated',
    type: 'string',
  })
  .help('h')
  .alias('h', 'help')
  .argv;

// Collect phone number passed from arguement
let phoneNumber = argv.phone;

/**
 * Check if no input was passed through CLI mode
 */
if (phoneNumber === undefined) {
  /**
   * Array of objects asking questions to user
   * for input
   * @type {Array}
   */
  const questions = [{
    type: 'input',
    name: 'phoneNumber',
    message: 'Please enter a phone number to be validated',
  }];

  /**
   * Prompt questions to user and get answer to process
   */
  inquirer.prompt(questions).then((answers) => {
    phoneNumber = answers.phoneNumber;
    checkNumber(phoneNumber);
  });
} else {
  /**
   * Check for phone number validation
   */
  checkNumber(phoneNumber);
}
