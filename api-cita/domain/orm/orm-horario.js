const models = require("../repositories/repository-mysql");
const util = require("../../util/util");
const { fn, col, where, Op } = models.Sequelize;
const moment = require("moment");

module.exports = {
  updateEstado: async (req, estado) => {
    let { id_horario } = req.body;
    return await models.horario.update(
      {
        estado: estado,
      },
      { where: { id: id_horario } }
    );
  },
};
