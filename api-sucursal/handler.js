const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const sucursal = require("./domain/services/service-sucursal"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.post("/api/sucursal", (req, res) => {
  return sucursal.Save(req, res);
});

app.get("/api/sucursal/findAll", (req, res) => {
  return sucursal.FindAll(req, res);
});

app.get("/api/sucursal/findById/:id_sucursal", (req, res) => {
  return sucursal.FindById(req, res);
});

app.delete("/api/sucursal/delete/:id_sucursal", (req, res) => {
  return sucursal.Delete(req, res);
});

app.get("/api/sucursal/pagination/:searchText/:page", (req, res) => {
  return sucursal.ListByQuery(req, res);
});

app.get("/api/sucursal/load/:id_sucursal/:page", (req, res) => {
  return sucursal.Load(req, res);
});

app.put("/api/sucursal", (req, res, next) => {
  return sucursal.Update(req, res);
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
