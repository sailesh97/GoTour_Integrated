import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import DotEnv from 'dotenv';

import { logger } from './src/utilities/logger';
import Routes from './src/routes/booking-routes';


DotEnv.config();

class Server{
    constructor(){
        this.app = express();
        this.port = +process.env.PORT;
        this.mongoUri = process.env.MONGODB_URI;
    }

    configureApplication(){
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ type:"application/json" }));
    }

    connectToDB(){
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUri, { useNewUrlParser: true });
        
        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "Go Tour Booking MS: Connection error: "));
        this.db.once("open", function () {
            logger.info("Go Tour Booking MS: Connected successfully - " + new Date())
        });
    }

    includeRoutes(){
        new Routes(this.app).routesConfig();
    }

    startTheServer() {
        this.configureApplication();
        this.connectToDB();
        this.includeRoutes();
        this.app.listen(this.port, () => {
            logger.info(`GoTourApp Booking MS: Server started at port: ${this.port}`);
        })        
    }
}

const server = new Server();

export default server;
