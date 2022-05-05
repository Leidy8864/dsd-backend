const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const config = require("../../config/config-nodemailer.json");
const { sendEmail } = require("../../util/mail");
const moment = require("moment");

module.exports = {
  ContactUs: async (req, res) => {
    try {
      var fullname = req.body.fullname != null ? req.body.fullname : "No especificó.";

      const email_info = {
        to: config.mail_contact,
        subject: "PAMOLSA - CONTACTANOS / " + fullname + " / " + moment().valueOf(),
        template: "contactus",
      };

      var data_send = {
        request: req.body.request.label != null ? req.body.request.label : "No especificó.",
        fullname: fullname,
        company: req.body.company != null ? req.body.company : "No especificó.",
        email: req.body.email != null ? req.body.email : "No especificó.",
        country: req.body.country != null ? req.body.country.name : "No especificó.",
        department: req.body.department != null ? req.body.department.name : "No especificó.",
        province: req.body.province != null ? req.body.province.name : "No especificó.",
        district: req.body.district != null ? req.body.district.name : "No especificó.",
        city: req.body.city != null ? req.body.city.name : "No especificó.",
        address: req.body.address != null ? req.body.address : "No especificó.",
        phone: req.body.phone != null ? req.body.phone : "No especificó.",
        comments: req.body.comments != null ? req.body.comments : "No especificó.",
      };


      var departmentReq = req.body.department
      var provinceReq = req.body.province
      var districtReq = req.body.district

      var state = undefined
      var province = undefined
      var city = undefined

      if (departmentReq != undefined && provinceReq != undefined && districtReq != undefined) {
        state = "51" + departmentReq.ubigeo //Departamento
        province = "51" + provinceReq.ubigeo // Provincia 
        city = "51" + districtReq.ubigeo //Distrito //city: "23009000", //req.body.city.code,
      }

      var body = {
        name: data_send.fullname,
        email: data_send.email,
        celPhone: data_send.phone,
        address: data_send.address,
        state: state,
        province: province,
        city: city,
        product: req.body.request.value,
        message: data_send.comments,
        authorization: 1,
        direccion_ip: ip,
        dire_opor_ip: ip,
        unidad_operativa: "348",
        country: req.body.country.code+"",
        business: data_send.company,
      };

      var headers = {
        "Content-Type": "application/json;",
        Empresa: "carvajalperu",
        Authorization: "Hmac Y3JtLmNhcnZhamFsOkM0cnY0ajRMV1M=",
      };

      code = enum_.CODE_OK;
      message = `Se mando el correo correctamente`;
      response = magic.ResponseService(code, message);
      res.status(code).json(response);

      await sendEmail(email_info, data_send, null, 0);
      magic.LogInfo("entro servicio Contacto")
      await contacto(headers, body);

    } catch (err) {
      code = enum_.CODE_INTERNAL_SERVER_ERROR;
      message = err.message;
      data = err;
      response = magic.ResponseService(code, message, data);
      magic.LogInfo(err);
    }
  },
};