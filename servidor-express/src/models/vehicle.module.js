import { DataTypes } from "sequelize";
import db from "../db.js";
import DriverModel from "./driver.module.js";

const VehicleModel = db.define(
  "vehicles",
  {
    ID_Vehicle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    DriverID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DriverModel,
        key: "ID_Driver",
      },
    },
    Model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Brand: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Plate: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    RevisionRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    RevisionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "vehicles",
    timestamps: false,
  }
);

export default VehicleModel;
