"use strict";

module.exports = (sequelize, DataTypes) => {
  const horario = sequelize.define(
    "horario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fecha: DataTypes.DATE,
      inicio: DataTypes.TIME,
      fin: DataTypes.TIME,
      estado: DataTypes.INTEGER,
      tipo: DataTypes.STRING,
      horario: DataTypes.STRING,
      dia: DataTypes.INTEGER,
      id_especialista: {
        type: DataTypes.INTEGER,
        references: {
          model: "especialista",
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
  horario.associate = (models) => {
    horario.belongsTo(models.especialista, {
      foreignKey: "id_especialista",
    });
  };
  return horario;
};
