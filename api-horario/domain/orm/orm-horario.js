const models = require("../repositories/repository-mysql");
const util = require("../../util/util");
const { fn, col, where, Op } = models.Sequelize;
const moment = require("moment");

module.exports = {
  save: async (req, res) => {
    let { fecha, inicio, fin, estado, id_especialista, tipo, horario, dia } = req.body;
    return await models.horario.create({
      fecha,
      inicio,
      fin,
      estado: estado || 1,
      tipo,
      horario,
      dia,
      id_especialista,
    });
  },
  saveBulk: async (req, res) => {
    return await models.horario.bulkCreate(req.body);
  },
  findAll: async (req, res) => {
    return await models.horario.findAll();
  },
  findById: async (req, res) => {
    return await models.horario.findOne({
      where: {
        id: req.params.id_horario,
      },
    });
  },
  update: async (req, res) => {
    let { id_horario, fecha, inicio, fin, estado, tipo, horario, dia, id_especialista } = req.body;
    return await models.horario.update(
      {
        fecha,
        inicio,
        fin,
        estado: estado || 1,
        tipo,
        horario,
        dia,
        id_especialista,
      },
      { where: { id: id_horario } }
    );
  },
  delete: async (req, res) => {
    return await models.horario.destroy({
      where: {
        id: req.params.id_horario,
      },
    });
  },
};
