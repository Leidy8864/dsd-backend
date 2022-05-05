"use strict";

module.exports = (sequelize, DataTypes) => {
  const sucursal = sequelize.define(
    "sucursal",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: DataTypes.STRING,
      direccion: DataTypes.STRING,
      distrito: DataTypes.STRING,
      estado: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      timestamps: false,
      omitNull: true,
      underscored: true,
    }
  );
  return sucursal;
};
