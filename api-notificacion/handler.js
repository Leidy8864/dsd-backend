const serverless = require("serverless-http");
const express = require("express");
const app = express();
const notificacion = require("./domain/services/service-notification"); 

app.post("/notificacion", (req, res, next) => {
  return notificacion.ContactUs(req, res)
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
