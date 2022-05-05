const models = require("../repositories/repository-mysql");
const bcrypt = require("bcryptjs");

module.exports = {
  save: async (req, res) => {
    let {
      nombres,
      apellidos,
      email,
      nro_documento,
      contrasena,
      estado,
      id_tipo_documento,
      id_tipo_usuario,
    } = req.body;
    return await models.usuario.create(
      {
        nombres,
        apellidos,
        email,
        nro_documento,
        contrasena: bcrypt.hashSync(contrasena, 10),
        estado,
        id_tipo_documento,
        id_tipo_usuario
      }
    );
  },
  findAll: async (req, res) => {
    return await models.usuario.findAll();
  },
  findById: async (req, res) => {
    return await models.usuario.findOne({
      where: {
        id: req.params.id_usuario,
      }
    });
  },
  delete: async (req, res) => {
    return await models.usuario.destroy({
      where: {
        id: req.params.id_usuario,
      }
    });
  },
  findByEmail: async (req, res) => {
    return await models.usuario.findOne({
      where: {
        email: req.body.email,
      },
    });
  },
};
