var nodemailer = require('nodemailer');
const config = require(__dirname + '/../config/config-nodemailer.json');

module.exports = {
	mailTransporter: async (usermail) => {
		var mailTransporter = nodemailer.createTransport({
			//pool: true,
			host: process.env.MAIL_HOST,
			//service: config.mailingserv,
			port: process.env.MAIL_PORT,
			secure: false, // use SSL
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS
			},
			debug: true,
			logger: false,
			requireTLS: true,
		});  
		return mailTransporter;  
	}
}