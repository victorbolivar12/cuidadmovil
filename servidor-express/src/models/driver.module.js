import { DataTypes } from "sequelize";
import db from "../db.js";
import UserModule from "./user.module.js";

const DriverModel = db.define(
  "drivers",
  {
    ID_Driver: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ID_Number: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    BankEntity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    AccountNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    PsychologicalRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PsychologicalEvaluationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    EmergencyContact1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    EmergencyContact2: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModule,
        key: "id",
      },
    },
  },
  {
    tableName: "drivers",
    timestamps: false,
  }
);

export default DriverModel;
