const models = require("../repositories/repository-mysql");
const util = require("../../util/util");
const { fn, col, where, Op } = models.Sequelize;
const moment = require("moment");

module.exports = {
  save: async (req, res) => {
    let { nombres, apellidos, dni, estado, id_especialidad, id_sucursal } = req.body;
    return await models.especialista.create({
      nombres,
      apellidos,
      dni,
      estado: estado || 1,
      id_especialidad,
      id_sucursal,
    });
  },
  findAll: async (req, res) => {
    return await models.especialista.findAll();
  },
  findById: async (req, res) => {
    return await models.especialista.findOne({
      where: {
        id: req.params.id_especialista,
      },
      include: [
        {
          model: models.horario,
          as: "horarios",
        },
      ],
    });
  },
  delete: async (req, res) => {
    return await models.especialista.destroy({
      where: {
        id: req.params.id_especialista,
      },
    });
  },
  pagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var pagination = util.getPagination(10, req.params.page);
    var queryReq = searchText.toLowerCase();
    return await models.especialista.findAll({
      where: {
        [Op.or]: {
          nombres: where(fn('LOWER', col('nombres')), 'LIKE', '%' + queryReq + '%'),
          apellidos: where(fn('LOWER', col('apellidos')), 'LIKE', '%' + queryReq + '%')
        },
      },
      include: [
        {
          model: models.especialidad,
          as: "especialidad",
        },
        {
          model: models.sucursal,
          as: "sucursal",
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  countAllPagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var queryReq = searchText.toLowerCase();
    return await models.especialista.count({
      where: {
        [Op.or]: {
          nombres: where(fn('LOWER', col('nombres')), 'LIKE', '%' + queryReq + '%'),
          apellidos: where(fn('LOWER', col('apellidos')), 'LIKE', '%' + queryReq + '%')
        },
      },
    });
  },
  filter: async (req, res) => {
    var pagination = util.getPagination(10, req.body.page);
    return await models.especialista.findAll({
      where: {
        id_sucursal: req.body.id_sucursal,
        id_especialidad: req.body.id_especialidad,
      },
      include: [
        {
          model: models.horario,
          as: "horarios",
          where: {
            fecha: moment.tz(req.body.fecha, "America/Lima").format("YYYY-MM-DD"),
            estado: 1,
          }
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  countAllFilter: async (req, res) => {
    return await models.especialista.count({
      where: {
        id_sucursal: req.body.id_sucursal,
        id_especialidad: req.body.id_especialidad,
      },
      include: [
        {
          model: models.horario,
          as: "horarios",
          where: {
            fecha: moment.tz(req.body.fecha, "America/Lima").format("YYYY-MM-DD"),
            //dia: req.body.dia,
          }
        },
      ],
    });
  },
  update: async (req, res) => {
    let { nombre, descripcion, id_sucursal, id } = req.body;
    return await models.especialista.update(
      {
        nombre,
        descripcion,
        id_sucursal
      },
      { where: { id: id } }
    );
  },
};
