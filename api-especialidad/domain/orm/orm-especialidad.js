const models = require("../repositories/repository-mysql");
const util = require("../../util/util");
const { fn, col, where, Op } = models.Sequelize;

module.exports = {
  save: async (req, res) => {
    let { nombre, descripcion, estado, id_sucursal } = req.body;
    return await models.especialidad.create({
      nombre,
      descripcion,
      estado: estado || 1,
      id_sucursal
    });
  },
  findAll: async (req, res) => {
    return await models.especialidad.findAll();
  },
  findById: async (req, res) => {
    return await models.especialidad.findOne({
      where: {
        id: req.params.id_especialidad,
      },
    });
  },
  delete: async (req, res) => {
    return await models.especialidad.destroy({
      where: {
        id: req.params.id_especialidad,
      },
    });
  },
  pagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var pagination = util.getPagination(10, req.params.page);
    var queryReq = searchText.toLowerCase();
    return await models.especialidad.findAll({
      where: {
        nombre: where(fn('LOWER', col('nombre')), 'LIKE', '%' + queryReq + '%')
      },
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  countAllPagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var queryReq = searchText.toLowerCase();
    return await models.especialidad.count({
      where: {
        nombre: where(fn('LOWER', col('nombre')), 'LIKE', '%' + queryReq + '%')
      },
    });
  },
  update: async (req, res) => {
    let { nombre, descripcion, id } = req.body;
    return await models.especialidad.update(
      {
        nombre,
        descripcion,
      },
      { where: { id: id } }
    );
  },
};
