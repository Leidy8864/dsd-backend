const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm_especialidad = require("../orm/orm-especialidad");
const orm_sucursal = require("../orm/orm-sucursal");

module.exports = {
  Save: async (req, res) => {
    try {
      await orm_especialidad.save(req);
      code = enum_.CODE_OK;
      res.status(code).json(req.body);
    } catch (err) {
      code = enum_.CODE_INTERNAL_SERVER_ERROR;
      message = err.message;
      data = err;
      response = magic.ResponseService(code, message, data);
      magic.LogInfo(err);
      return res.status(code).json(response);
    }
  },
  FindAll: async (req, res) => {
    return await orm_especialidad
      .findAll(req)
      .then((especialidades) => {
        code = enum_.CODE_OK;
        res.status(code).json(especialidades);
      })
      .catch((err) => {
        code = enum_.CODE_INTERNAL_SERVER_ERROR;
        message = err.message;
        data = err;
        response = magic.ResponseService(code, message, data);
        magic.LogInfo(err);
        return res.status(code).json(response);
      });
  },
  
  FindById: async (req, res) => {
    return await orm_especialidad
      .findById(req)
      .then((especialidad) => {
        code = enum_.CODE_OK;
        res.status(code).json(especialidad);
      })
      .catch((err) => {
        code = enum_.CODE_INTERNAL_SERVER_ERROR;
        message = err.message;
        data = err;
        response = magic.ResponseService(code, message, data);
        magic.LogInfo(err);
        return res.status(code).json(response);
      });
  },
  Delete: async (req, res) => {
    await orm_especialidad
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino la especialidad.`;
        data = {
          user_id: req.params.id_especialidad,
          deleted: true,
        };
        response = magic.ResponseService(code, message, data);
        res.status(code).json(response);
      })
      .catch((err) => {
        code = enum_.CODE_INTERNAL_SERVER_ERROR;
        message = err.message;
        data = err;
        response = magic.ResponseService(code, message, data);
        magic.LogInfo(err);
        return res.status(code).json(response);
      });
  },
  ListByQuery: async (req, res) => {
    const count = await orm_especialidad.countAllPagination(req);
    return await orm_especialidad
      .pagination(req)
      .then((especialidades) => {
        code = enum_.CODE_OK;
        data = {
          content: especialidades,
          currentPage: req.params.page,
          totalPages: Math.ceil(count / 10),
        }
        res.status(code).json(data);
      })
      .catch((err) => {
        code = enum_.CODE_INTERNAL_SERVER_ERROR;
        message = err.message;
        data = err;
        response = magic.ResponseService(code, message, data);
        magic.LogInfo(err);
        return res.status(code).json(response);
      });
  },
  Load: async (req, res) => {
    try {
      const especialidad = await orm_especialidad.findById(req);
      const sucursales = await orm_sucursal.findAll(req);
      const count = await orm_especialidad.countAllPagination(req);
      const especialidades = await orm_especialidad.pagination(req);
      code = enum_.CODE_OK;
      pagination = {
        content: especialidades,
        currentPage: req.params.page,
        totalPages: Math.ceil(count / 10),
      };
      data = {
        especialidad,
        pagination,
        sucursales
      };
      res.status(code).json(data);
    } catch (err) {
      code = enum_.CODE_INTERNAL_SERVER_ERROR;
      message = err.message;
      data = err;
      response = magic.ResponseService(code, message, data);
      magic.LogInfo(err);
      return res.status(code).json(response);
    }
  },
  Update: async (req, res) => {
    await orm_especialidad
      .update(req)
      .then(() => {
        code = enum_.CODE_OK;
        res.status(code).json(req.body);
      })
      .catch((err) => {
        code = enum_.CODE_INTERNAL_SERVER_ERROR;
        message = err.message;
        data = err;
        response = magic.ResponseService(code, message, data);
        magic.LogInfo(err);
        return res.status(code).json(response);
      });
  },
};