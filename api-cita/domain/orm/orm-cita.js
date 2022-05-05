const models = require("../repositories/repository-mysql");
const util = require("../../util/util");
const { fn, col, where, Op } = models.Sequelize;

module.exports = {
  save: async (req, res) => {
    let { fecha, inicio, fin, condicion, estado, id_horario, id_usuario, id_sucursal, id_especialista, id_especialidad } = req.body;
    return await models.cita.create({
      fecha,
      inicio,
      fin,
      condicion,
      estado: estado || 1,
      id_horario,
      id_usuario,
      id_sucursal,
      id_especialista,
      id_especialidad
    });
  },
  findAll: async (req, res) => {
    return await models.cita.findAll({
      include: [
        {
          model: models.sucursal,
          as: "sucursal",
          required: false,
        },
        {
          model: models.especialidad,
          as: "especialidad",
          required: false,
        },
        {
          model: models.especialista,
          as: "especialista",
          required: false,
        },
        {
          model: models.horario,
          as: "horario",
          required: false,
        },
      ],
    });
  },
  findById: async (req, res) => {
    return await models.cita.findOne({
      where: {
        id: req.params.id_cita,
      },
    });
  },
  update: async (req, res) => {
    let { fecha, inicio, fin, condicion, estado, id_horario, id_usuario, id_cita } = req.body;
    return await models.cita.update(
      {
        fecha,
        inicio,
        fin,
        condicion,
        estado: estado || 1,
        id_horario,
        id_usuario,
      },
      { where: { id: id_cita } }
    );
  },
  delete: async (req, res) => {
    return await models.cita.destroy({
      where: {
        id: req.params.id_cita,
      },
    });
  },
  pagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var pagination = util.getPagination(10, req.params.page);
    var queryReq = searchText.toLowerCase();
    return await models.cita.findAll({
      where: {
        id_usuario: req.params.id_usuario,
      },
      include: [
        {
          model: models.sucursal,
          as: "sucursal",
          required: false,
        },
        {
          model: models.especialidad,
          as: "especialidad",
          required: false,
        },
        {
          model: models.especialista,
          as: "especialista",
          required: false,
        },
        {
          model: models.horario,
          as: "horario",
          required: false,
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
    },);
  },
  countAllPagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var queryReq = searchText.toLowerCase();
    return await models.cita.count({
      where: {
        [Op.or]: {
          id_usuario: req.params.id_usuario,
        },
      },
    });
  },
};
