const models = require("../repositories/repository-mysql");

module.exports = {
  findAll: async (req, res) => {
    return await models.horario.findAll();
  },
  findById: async (req, res) => {
    return await models.horario.findOne({
      where: {
        id: req.params.horario_id,
      },
    });
  },
  update: async (req, res) => {
    let { id, fecha, inicio, fin, estado, tipo, horario, dia } = req;
    return await models.horario.update(
      {
        fecha,
        inicio,
        fin,
        estado: estado || 1,
        tipo,
        horario,
        dia,
      },
      { where: { id: id } }
    );
  },
  save: async (req, res) => {
    let { fecha, inicio, fin, estado, id_especialista, tipo, horario, dia } = req;
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
};
