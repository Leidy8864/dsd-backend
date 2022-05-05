const models = require("../repositories/repository-mysql");

module.exports = {
  findAll: async (req, res) => {
    return await models.sucursal.findAll();
  },
  findById: async (req, res) => {
    return await models.sucursal.findOne({
      where: {
        id: req.params.sucursal_id,
      },
    });
  },
};
