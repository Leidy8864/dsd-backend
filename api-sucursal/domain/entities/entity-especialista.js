"use strict";

module.exports = (sequelize, DataTypes) => {
  const especialista = sequelize.define(
    "especialista",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombres: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      dni: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      id_especialidad: {
        type: DataTypes.INTEGER,
        references: {
          model: "especialidad",
          key: "id",
        },
      },
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
  especialista.associate = (models) => {
    especialista.belongsTo(models.especialidad, {
      foreignKey: "id_especialidad",
    });
    especialista.belongsTo(models.sucursal, {
      foreignKey: "id_sucursal",
    });
  };
  return especialista;
};
