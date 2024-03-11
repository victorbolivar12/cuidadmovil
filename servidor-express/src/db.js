import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv' 
dotenv.config()

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  port: 1433,
  dialect: "mssql",
});

export default  db