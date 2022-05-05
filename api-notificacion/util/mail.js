const path = require("path");
const config = require(__dirname + "/../config/config-nodemailer.json");
const mailing = require("./mailing");
const hbs = require("nodemailer-express-handlebars");
const magic = require("../util/magic");

module.exports = {
  sendEmail: async ({ to, subject, template, cc = "" }, context = {}, file, usermail) => {
    let transporter = await mailing.mailTransporter(usermail);
    transporter.verify(function (error, success) {
      if (error) {
        console.log(context);
        magic.LogDanger(error);
      } else {
        magic.LogSuccess("El servidor esta listo para enviar mensajes.");
      }
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".hbs",
        partialsDir: path.join(__dirname, "views/partials"),
        layoutsDir: path.join(__dirname, "views/layouts"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "../views"),
      extName: ".hbs",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var attachments = undefined;
    if (file != null) {
      var attachments = {
        filename: file.name,
        content: file.data,
      };
    }
    let user = config.users[usermail].mailinguser;

    var mailOptions = {
      from: user,
      to: to,
      bcc: cc,
      subject: subject,
      template: template,
      context: context,
      attachments: attachments
    };

    await transporter
      .sendMail(mailOptions)
      .then(() => {
        magic.LogInfo("Se envio el correo correctamente");
      })
      .catch((err) => {
        console.log(context);
        magic.LogDanger(err);
      });
  },
};
