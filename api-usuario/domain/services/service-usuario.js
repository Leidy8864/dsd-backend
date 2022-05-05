const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const models = require("../repositories/repository-mysql");
const orm_usuario = require("../orm/orm-usuario");
const config = require("../../config/config.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Save: async (req, res) => {
    try {
      await orm_usuario.save(req);
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
    return await orm_usuario
      .findAll(req)
      .then((usuarios) => {
        code = enum_.CODE_OK;
        res.status(code).json(usuarios);
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
    return await orm_usuario
      .findById(req)
      .then((usuario) => {
        code = enum_.CODE_OK;
        res.status(code).json(usuario);
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
    await orm_usuario
      .delete(req)
      .then(() => {
        code = enum_.CODE_OK;
        message = `Se elimino el usuario.`;
        data = {
          user_id: req.params.id_usuario,
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
  SignIn: async (req, res) => {
    await orm_usuario
      .findByEmail(req)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.contrasena,
          user.contrasena
        );
        if (!passwordIsValid) {
          return res
            .status(401)
            .send({ accessToken: null, message: "Contraseña invalida." });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          //expiresIn: 86400,
        });
        user.setDataValue('token', token);
        code = enum_.CODE_OK;
        res.status(code).json(user);
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