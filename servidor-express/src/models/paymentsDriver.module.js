import { DataTypes } from "sequelize";
import db from "../db.js";
import Bank from "./bank.module.js";
import Driver from "./driver.module.js";

const PaymentsDriver = db.define(
  "paymentsDriver",
  {
    ID_Payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    BankID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bank,
        key: "ID_bank",
      },
    },
    DriverID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Driver,
        key: "ID_driver",
      },
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "paymentsDriver",
    timestamps: false,
  }
);

export default PaymentsDriver;