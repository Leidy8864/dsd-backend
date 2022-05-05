"use strict";

module.exports = (sequelize, DataTypes) => {
  const tipoUsuario = sequelize.define(
    "tipo_usuario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      descripcion: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
      omitNull: true,
      underscored: true,
    }
  );
  return tipoUsuario;
};
