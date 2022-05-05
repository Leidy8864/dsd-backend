const models = require("../repositories/repository-mysql");

module.exports = {
  findAll: async (req, res) => {
    return await models.especialidad.findAll();
  },
  findById: async (req, res) => {
    return await models.especialidad.findOne({
      where: {
        id: req.params.especialidad_id,
      },
    });
  },
};
