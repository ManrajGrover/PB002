"use strict";

/**
 * @param  {String} phoneNumber Phone number to be validated 
 * @return {Boolean}            true or false
 */
const validateNumber = (phoneNumber) => {
  return /^(0|\+91)?[789]\d{9}$/.test(phoneNumber);
};

/**
 * Export helpers functions
 * @type {Object}
 */
module.exports = {
  "validateNumber" : validateNumber
};
