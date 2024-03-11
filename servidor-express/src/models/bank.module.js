import { DataTypes } from "sequelize";
import db from "../db.js";

const Bank = db.define(
  "bank",
  {
    ID_bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "banks",
    timestamps: false,
  }
);

export default Bank;
