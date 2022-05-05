const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm_horario = require("../orm/orm-horario");
const orm_especialista = require("../orm/orm-especialista");

module.exports = {
  Save: async (req, res) => {
    try {
      let h = await orm_horario.save(req);
      code = enum_.CODE_OK;
      res.status(code).json(h.dataValues);
    } catch (err) {
      code = enum_.CODE_INTERNAL_SERVER_ERROR;
      message = err.message;
      data = err;
      response = magic.ResponseService(code, message, data);
      magic.LogInfo(err);
      return res.status(code).json(response);
    }
  },
  SaveHorarios: async (req, res) => {
    try {
      await orm_horario.saveBulk(req);
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
    return await orm_horario
      .findAll(req)
      .then((horarios) => {
        code = enum_.CODE_OK;
        res.status(code).json(horarios);
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
    return await orm_horario
      .findById(req)
      .then((horario) => {
        code = enum_.CODE_OK;
        res.status(code).json(horario);
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
    await orm_horario
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino el horario.`;
        data = {
          user_id: req.params.id_horario,
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
    await orm_horario
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
  Delete: async (req, res) => {
    await orm_horario
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino el horario.`;
        data = {
          id_horario: req.params.id_horario,
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
};