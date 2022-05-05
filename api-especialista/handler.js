const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const especialista = require("./domain/services/service-especialista"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/especialista", (req, res) => {
  return especialista.Save(req, res);
});

app.get("/api/especialista/findAll", (req, res) => {
  return especialista.FindAll(req, res);
});

app.get("/api/especialista/findById/:id_especialista", (req, res) => {
  return especialista.FindById(req, res);
});

app.delete("/api/especialista/delete/:id_especialista", (req, res) => {
  return especialista.Delete(req, res);
});

app.post("/api/especialista/filter", (req, res) => {
  return especialista.Filter(req, res);
});

app.get("/api/especialista/pagination/:searchText/:page", (req, res) => {
  return especialista.ListByQuery(req, res);
});

app.get("/api/especialista/load/:id_especialista/:page", (req, res) => {
  return especialista.Load(req, res);
});

app.put("/api/especialista", (req, res) => {
  return especialista.Update(req, res);
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
