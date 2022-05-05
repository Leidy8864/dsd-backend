"use strict";
const MailService = require('./service/mail-service');

module.exports.mail = async (event) => {
  try {
    if (event.Records != undefined) {
      await MailService.sendEmail(event);
    }
  } catch (error) {
    throw error;
  };
};
