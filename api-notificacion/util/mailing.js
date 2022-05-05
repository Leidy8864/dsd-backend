var nodemailer = require('nodemailer');
const config = require(__dirname + '/../config/config-nodemailer.json');

module.exports = {
	mailTransporter: async (usermail) => {
		let user = config.users[usermail].mailinguser;
		let pass = config.users[usermail].mailingpass;

		var mailTransporter = nodemailer.createTransport({
			//pool: true,
			host: config.mailinghost,
			//service: config.mailingserv,
			port: config.mailingport,
			secure: false, // use SSL
			auth: {
				user: user,
				pass: pass
			},
			debug: true,
			logger: false,
			requireTLS: true,
		});  
		return mailTransporter;  
	}
}