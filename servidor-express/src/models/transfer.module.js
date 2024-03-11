import { DataTypes } from "sequelize";
import db from "../db.js";
import CustomerModel from "./customer.module.js";
import DriverModel from "./driver.module.js";
import VehicleModel from "./vehicle.module.js";

const TransferModel = db.define(
  "transfers",
  {
    ID_Transfer: {
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
    DriverID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: DriverModel,
        key: "ID_Driver",
      },
    },
    VehicleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: VehicleModel,
        key: "ID_Vehicle",
      },
    },
    TransferDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Origin: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    Destination: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    Cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "transfers",
    timestamps: false,
  }
);

// Definir asociaciones
TransferModel.belongsTo(CustomerModel, { foreignKey: 'CustomerID' });
TransferModel.belongsTo(DriverModel, { foreignKey: 'DriverID' });
TransferModel.belongsTo(VehicleModel, { foreignKey: 'VehicleID' });

export default TransferModel;

