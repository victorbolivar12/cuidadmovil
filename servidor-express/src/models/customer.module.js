import { DataTypes } from "sequelize";
import db from "../db.js";
import UserModule from "./user.module.js";

const CustomerModel = db.define(
  "customers",
  {
    ID_Client: {
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
    Balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
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
    tableName: "customers",
    timestamps: false,
  }
);

export default CustomerModel;
