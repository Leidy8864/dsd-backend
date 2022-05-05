const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const usuario = require("./domain/services/service-usuario"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.post("/api/usuario", (req, res, next) => {
  return usuario.Save(req, res);
});

app.get("/api/usuario/findAll", (req, res, next) => {
  return usuario.FindAll(req, res);
});

app.get("/api/usuario/findById/:id_usuario", (req, res, next) => {
  return usuario.FindById(req, res);
});

app.delete("/api/usuario/delete/:id_usuario", (req, res, next) => {
  return usuario.Delete(req, res);
});

app.post("/api/usuario/login", (req, res, next) => {
  return usuario.SignIn(req, res);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
