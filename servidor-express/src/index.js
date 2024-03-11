import app from './app.js'
import * as dotenv from 'dotenv'
import createTables from '../src/lib/initializeTables.js'
import leadSeaders from '../src/seeders/leadSeeaders.js'


dotenv.config()
import db from './db.js'
import usersRoutes from './routes/routes.js'
import authRoutes from "./routes/auth.routes.js";
import custumerRoutes from './routes/costumer.routes.js'
import driverRoutes from './routes/drive.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import rechargesRoutes from './routes/recharges.routes.js'
import transferRoutes from './routes/transfer.routes.js'
import bankRoute from './routes/bank.routes.js'
import paymentsDriverRoute from './routes/paymentsDriver.routes.js'

//defines the server routes
app.use('/users',usersRoutes)
app.use("/auth", authRoutes)
app.use("/customer", custumerRoutes)
app.use("/driver", driverRoutes)
app.use("/vehicle", vehicleRoutes)
app.use("/recharge", rechargesRoutes)
app.use("/transfer", transferRoutes)
app.use("/bank", bankRoute)
app.use("/paymentsdriver", paymentsDriverRoute)


//defines functions that start with the server
try {
  await db.authenticate()
  createTables()
  //leadSeaders()
} catch (error) {
  console.log(`Error: ${error}`);
}

app.get('/', (req, res) => {
  res.send({
    "name": "servidor-express",
    "version": "1.0.0",
    "description": "Proyecto Final",
    "type": "module",
    "main": "index.js",
    "author": "Victor Bolivar",
    "license": "ISC",
  });
});

app.listen(process.env.PORT, () => {})