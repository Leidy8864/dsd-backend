"use strict";

module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define(
    "usuario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombres: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      email: DataTypes.STRING,
      nro_documento: DataTypes.STRING,
      password: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      tipo_usuario: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      timestamps: false,
      omitNull: true,
      underscored: true,
    }
  );
  return usuario;
};
