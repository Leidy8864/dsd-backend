const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const cita = require("./domain/services/service-cita"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/cita", (req, res) => {
  return cita.Save(req, res);
});

app.post("/api/citas", (req, res) => {
  return cita.Savecitas(req, res);
});

app.get("/api/cita/findAll", (req, res) => {
  return cita.FindAll(req, res);
});

app.get("/api/cita/findById/:id_cita", (req, res) => {
  return cita.FindById(req, res);
});

app.delete("/api/cita/delete/:id_cita", (req, res) => {
  return cita.Delete(req, res);
});

app.put("/api/cita", (req, res) => {
  return cita.Update(req, res);
});

app.get("/api/cita/pagination/:id_usuario/:searchText/:page", (req, res) => {
  return cita.ListByQuery(req, res);
});

app.get("/api/cita/load", (req, res) => {
  return cita.Load(req, res);
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
