"use strict";

module.exports = (sequelize, DataTypes) => {
  const especialidad = sequelize.define(
    "especialidad",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      id_sucursal: {
        type: DataTypes.INTEGER,
        references: {
          model: "sucursal",
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
  especialidad.associate = (models) => {
    especialidad.belongsTo(models.sucursal, {
      foreignKey: "id_sucursal",
    });
  };
  return especialidad;
};
