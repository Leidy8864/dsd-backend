const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm_cita = require("../orm/orm-cita");
const orm_especialidad = require("../orm/orm-especialidad");
const orm_sucursal = require("../orm/orm-sucursal");
const orm_horario = require("../orm/orm-horario");

module.exports = {
  Save: async (req, res) => {
    try {
      await orm_cita.save(req);
      await orm_horario.updateEstado(req, 0);
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
    return await orm_cita
      .findAll(req)
      .then((citas) => {
        code = enum_.CODE_OK;
        res.status(code).json(citas);
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
    return await orm_cita
      .findById(req)
      .then((cita) => {
        code = enum_.CODE_OK;
        res.status(code).json(cita);
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
    await orm_cita
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino la cita.`;
        data = {
          id: req.params.id_cita,
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
  Update: async (req, res) => {
    await orm_cita
      .update(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se actualizo la cita.`;
        response = magic.ResponseService(code, message);
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
    const count = await orm_cita.countAllPagination(req);
    return await orm_cita
      .pagination(req)
      .then((citas) => {
        code = enum_.CODE_OK;
        data = {
          content: citas,
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
      const sucursales = await orm_sucursal.findAll(req);
      const especialidades = await orm_especialidad.findAll(req);
      code = enum_.CODE_OK;
      data = {
        sucursales,
        especialidades
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
};