"use strict";

module.exports = (sequelize, DataTypes) => {
  const cita = sequelize.define(
    "cita",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fecha: DataTypes.DATE,
      inicio: DataTypes.TIME,
      fin: DataTypes.TIME,
      condicion: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      id_horario: {
        type: DataTypes.INTEGER,
        references: {
          model: "horario",
          key: "id",
        },
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuario",
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
      id_especialista: {
        type: DataTypes.INTEGER,
        references: {
          model: "especialista",
          key: "id",
        },
      },
      id_especialidad: {
        type: DataTypes.INTEGER,
        references: {
          model: "especialidad",
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
  cita.associate = (models) => {
    cita.belongsTo(models.horario, {
      as: "horario",
      foreignKey: "id_horario",
    });
    cita.belongsTo(models.usuario, {
      foreignKey: "id_usuario",
    });
    cita.belongsTo(models.sucursal, {
      as: "sucursal",
      foreignKey: "id_sucursal",
    });
    cita.belongsTo(models.especialista, {
      as: "especialista",
      foreignKey: "id_especialista",
    });
    cita.belongsTo(models.especialidad, {
      as: "especialidad",
      foreignKey: "id_especialidad",
    });
  };
  return cita;
};
