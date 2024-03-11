import { DataTypes } from "sequelize";
import db from "../db.js";
import CustomerModel from "./customer.module.js";

const RechargeModel = db.define(
  "recharges",
  {
    ID_Recharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CustomerModel,
        key: "ID_Client",
      },
    },
    RechargeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ReferenceNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Bank: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "recharges",
    timestamps: false,
  }
);

RechargeModel.belongsTo(CustomerModel, { foreignKey: 'CustomerID' });

export default RechargeModel;
