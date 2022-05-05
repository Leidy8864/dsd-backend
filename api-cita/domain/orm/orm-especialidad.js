const models = require("../repositories/repository-mysql");

module.exports = {
  findAll: async (req, res) => {
    return await models.especialidad.findAll();
  },
}