import db from "../db.js";
import UserModule from "../models/user.module.js";
import CustomerModel from "../models/customer.module.js";
import DriverModel from "../models/driver.module.js";
import VehicleModel from "../models/vehicle.module.js";
import RechargeModel from "../models/recharges.module.js";
import TransferModel from "../models/transfer.module.js";
import BankModule from "../models/bank.module.js";
import PaymentDriver from "../models/paymentsDriver.module.js";

async function createTableIfNotExists(model) {
  try {
    const tableExists = await db
      .getQueryInterface()
      .showAllTables()
      .then((tables) => tables.includes(model.tableName));

    if (!tableExists) {
      await model.sync();
      //console.log(`Table ${model.tableName} created successfully`);
    }
  } catch (error) {
    console.error(`Error creating table ${model.tableName}:`, error);
  }
}

async function createTables() {
  try {
    const models = [
      UserModule,
      CustomerModel,
      DriverModel,
      VehicleModel,
      RechargeModel,
      TransferModel,
      BankModule,
      PaymentDriver
    ];

    for (const model of models) {
      await createTableIfNotExists(model);
    }

    //console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating the tables:", error);
  }
}

export default createTables;
