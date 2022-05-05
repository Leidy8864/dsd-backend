"use strict";

module.exports = (sequelize, DataTypes) => {
  const tipoDocumento = sequelize.define(
    "tipo_documento",
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
  return tipoDocumento;
};
