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
      contrasena: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      id_tipo_documento: {
        type: DataTypes.INTEGER,
        references: {
          model: "tipo_documento",
          key: "id",
        },
      },
      id_tipo_usuario: {
        type: DataTypes.INTEGER,
        references: {
          model: "tipo_usuario",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      omitNull: true,
      underscored: true,
    }
  );
  usuario.associate = (models) => {
    usuario.belongsTo(models.tipo_documento, {
      foreignKey: "id_tipo_documento",
    });
    usuario.belongsTo(models.tipo_usuario, {
      foreignKey: "id_tipo_usuario",
    });
  };
  return usuario;
};
