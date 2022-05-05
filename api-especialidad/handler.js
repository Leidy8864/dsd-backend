const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const especialidad = require("./domain/services/service-especialidad"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/especialidad", (req, res) => {
  return especialidad.Save(req, res);
});

app.get("/api/especialidad/findAll", (req, res) => {
  return especialidad.FindAll(req, res);
});

app.get("/api/especialidad/findById/:id_especialidad", (req, res) => {
  return especialidad.FindById(req, res);
});

app.delete("/api/especialidad/delete/:id_especialidad", (req, res) => {
  return especialidad.Delete(req, res);
});

app.get("/api/especialidad/pagination/:searchText/:page", (req, res) => {
  return especialidad.ListByQuery(req, res);
});

app.get("/api/especialidad/load/:id_especialidad/:page", (req, res) => {
  return especialidad.Load(req, res);
});

app.put("/api/especialidad", (req, res, next) => {
  return especialidad.Update(req, res);
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
