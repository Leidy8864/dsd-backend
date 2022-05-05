const models = require("../repositories/repository-mysql");

module.exports = {
  findByQuery: async (req, res) => {
    return await models.especialista.findAll({
      attributes: ['id'],
      where: {
        id_especialidad: req.body.id_especialidad,
        id_sucursal: req.body.id_sucursal,
      },
      raw: true,
    });
  },
};
