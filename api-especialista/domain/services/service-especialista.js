const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm_especialista = require("../orm/orm-especialista");
const orm_especialidad = require("../orm/orm-especialidad");
const orm_sucursal = require("../orm/orm-sucursal");
const orm_horario = require("../orm/orm-horario");

module.exports = {
  Save: async (req, res) => {
    try {
      let esp = await orm_especialista.save(req);
      let { horarios } = req.body;
      if (horarios.length > 0) {
        for (let index = 0; index < horarios.length; index++) {
          const element = horarios[index];
          element.id_especialista = esp.dataValues.id;
          await orm_horario.save(element);
        }
      }
      code = enum_.CODE_OK;
      res.status(code).json(esp.dataValues);
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
    return await orm_especialista
      .findAll(req)
      .then((especialistas) => {
        code = enum_.CODE_OK;
        res.status(code).json(especialistas);
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
    return await orm_especialista
      .findById(req)
      .then((especialista) => {
        code = enum_.CODE_OK;
        res.status(code).json(especialista);
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
    await orm_especialista
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino el especialista.`;
        data = {
          user_id: req.params.id_especialista,
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
    const count = await orm_especialista.countAllPagination(req);
    return await orm_especialista
      .pagination(req)
      .then((especialistas) => {
        code = enum_.CODE_OK;
        data = {
          content: especialistas,
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
  Filter: async (req, res) => {
    const count = await orm_especialista.countAllFilter(req);
    return await orm_especialista
      .filter(req)
      .then((especialistas) => {
        code = enum_.CODE_OK;
        data = {
          content: especialistas,
          currentPage: req.body.page,
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
  ListByQuery: async (req, res) => {
    const count = await orm_especialista.countAllPagination(req);
    return await orm_especialista
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
      const especialista = await orm_especialista.findById(req);
      const especialidades = await orm_especialidad.findAll(req);
      const sucursales = await orm_sucursal.findAll(req);
      code = enum_.CODE_OK;
      let data = {
        especialidades,
        sucursales,
        especialista
      }
      return res.status(code).json(data);
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
    try {
      let { horarios, id } = req.body;
      await orm_especialista.update(req);
      if (horarios.length > 0) {
        for (let index = 0; index < horarios.length; index++) {
          const element = horarios[index];
          if (element.id != 0) {
            await orm_horario.update(element);
          } else {
            element.id_especialista = id;
            await orm_horario.save(element);
          }
        }
      }
      code = enum_.CODE_OK;
      return res.status(code).json(req.body);
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