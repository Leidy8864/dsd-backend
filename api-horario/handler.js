const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const horario = require("./domain/services/service-horario");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/horario", (req, res, next) => {
  return horario.Save(req, res);
});

app.post("/api/horarios", (req, res, next) => {
  return horario.SaveHorarios(req, res);
});

app.get("/api/horario/findAll", (req, res, next) => {
  return horario.FindAll(req, res);
});

app.get("/api/horario/findById/:id_horario", (req, res, next) => {
  return horario.FindById(req, res);
});

app.delete("/api/horario/delete/:id_horario", (req, res, next) => {
  return horario.Delete(req, res);
});

app.put("/api/horario", (req, res, next) => {
  return horario.Update(req, res);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
