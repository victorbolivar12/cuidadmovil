import UserModule from "../models/user.module.js";
import CustomerModel from "../models/customer.module.js";
import DriverModel from "../models/driver.module.js"
import TransferModel from "../models/transfer.module.js"
import VehicleModel from "../models/vehicle.module.js";
import RechargeModel from "../models/recharges.module.js";

import usersData from "./users.data.js";
import customersData from "./custumer.data.js"
import driversData from "./driver.data.js"
import transfersData from "./trasfer.data.js"
import vehiclesData from "./vehicle.data.js"
import rechargesData from "./recharges.data.js"


const seedData = async (dataArray, model) => {
    try {
        // Check if there are any records in the table
        const existingRecords = await model.findAll();
        if (existingRecords.length > 0) {
            return;
        }

        // Insert the data in the database
        const insertedData = await model.bulkCreate(dataArray);
        console.log("Records inserted successfully");
    } catch (error) {
        console.error("Error inserting records:", error);
    }
};

const runSeeders = async () => {
    try {
        const modelsData = [
            { name: "users", model: UserModule, data: usersData },
            //{ name: "custumers", model: CustomerModel, data: customersData },
            //{ name: "drivers", model: DriverModel, data: driversData },
            //{ name: "vehicle", model: VehicleModel, data: vehiclesData },
            //{ name: "recharge", model: RechargeModel, data: rechargesData },
            //{ name: "transfer", model: TransferModel, data: transfersData },
            
            // Call other seeders to insert additional records
            // Example:
            // name: "name_model", model: ModuleModel, data: modelData;
            // ...
        ];

        for (const modelData of modelsData) {
            await seedData(modelData.data, modelData.model);
            console.log(`Data successfully inserted into table ${modelData.name}`);
        }

    } catch (err) {
        console.error("Error running seeders:", err);
    }
};

export default runSeeders;
