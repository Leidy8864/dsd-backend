const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm_sucursal = require("../orm/orm-sucursal");

module.exports = {
  Save: async (req, res) => {
    try {
      await orm_sucursal.save(req);
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
  Update: async (req, res) => {
    await orm_sucursal
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
  FindAll: async (req, res) => {
    return await orm_sucursal
      .findAll(req)
      .then((sucursales) => {
        code = enum_.CODE_OK;
        res.status(code).json(sucursales);
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
    return await orm_sucursal
      .findById(req)
      .then((sucursal) => {
        code = enum_.CODE_OK;
        res.status(code).json(sucursal);
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
    await orm_sucursal
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino la sucursal.`;
        data = {
          user_id: req.params.id_sucursal,
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
    const count = await orm_sucursal.countAllPagination(req);
    return await orm_sucursal
      .pagination(req)
      .then((sucursales) => {
        code = enum_.CODE_OK;
        data = {
          content: sucursales,
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
      const sucursal = await orm_sucursal.findById(req);
      const count = await orm_sucursal.countAllPagination(req);
      const sucursales = await orm_sucursal.pagination(req);
      const departamentos = [
        {
          id: 1,
          departamento: "Lima"
        }
      ];
      const provincias = [
        {
          id: 1,
          id_departamento: 1,
          provincia: "Lima"
        }
      ];
      const distritos = [
        {
          id: 1,
          id_provincia: 1,
          distrito: "San Borja"
        }
      ];
      code = enum_.CODE_OK;
      pagination = {
        content: sucursales,
        currentPage: req.params.page,
        totalPages: Math.ceil(count / 10),
      };
      data = {
        sucursal,
        departamentos,
        provincias,
        distritos,
        pagination,
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