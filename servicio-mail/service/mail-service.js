const magic = require("../util/magic");
const enum_ = require("../util/enum");
const config = require("../../config/config-nodemailer.json");
const { sendEmail } = require("../util/mail");
const moment = require("moment");
const mailing = require("../util/mailing");

module.exports = {
  sendEmail: async (event) => {

    let sqsbody = JSON.parse(event.Records[0].body);
    let params = sqsbody.params;
    let context = sqsbody.context;
    params = {
      to: config.mail_contact,
      subject: "PAMOLSA - CONTACTANOS / " + fullname + " / " + moment().valueOf(),
      template: "contactus",
    };

    context = {
      request: req.body.request.label != null ? req.body.request.label : "No especificó.",
      fullname: fullname,
    };
    await sendEmail(sqsbody.email_confing, sqsbody.email_data, null, 0);

    let transporter = await mailing.mailTransporter(usermail);
    transporter.verify(function (error, success) {
      if (error) {
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

    var mailOptions = {
      from: process.env.MAIL_USER,
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