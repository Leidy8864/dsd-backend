const models = require("../repositories/repository-mysql");
const util = require("../../util/util");
const { fn, col, where, Op } = models.Sequelize;

module.exports = {
  save: async (req, res) => {
    let { id, nombre, direccion, distrito, estado } = req.body;
    return await models.sucursal.create({
      id,
      nombre,
      direccion,
      distrito,
      estado: estado || 1,
    });
  },
  update: async (req, res) => {
    let { id, nombre, direccion, distrito, estado } = req.body;
    return await models.sucursal.update(
      {
        id,
        nombre,
        direccion,
        distrito,
        estado: estado || 1,
      },
      { where: { id: id } }
    );
  },
  findAll: async (req, res) => {
    return await models.sucursal.findAll();
  },
  findById: async (req, res) => {
    return await models.sucursal.findOne({
      where: {
        id: req.params.id_sucursal,
      },
    });
  },
  delete: async (req, res) => {
    return await models.sucursal.destroy({
      where: {
        id: req.params.id_sucursal,
      },
    });
  },
  pagination: async (req, res) => {
    let searchText = req.params.searchText || "_";
    var pagination = util.getPagination(10, req.params.page);
    var queryReq = searchText.toLowerCase();
    return await models.sucursal.findAll({
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
    return await models.sucursal.count({
      where: {
        nombre: where(fn('LOWER', col('nombre')), 'LIKE', '%' + queryReq + '%')
      },
    });
  },
};
