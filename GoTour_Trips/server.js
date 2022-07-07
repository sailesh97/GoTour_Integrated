import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import Routes from "./src/routes/triplist-routes";
import { logger } from './src/utilities/logger';

class Server{
    constructor(){
        this.app = express();
        this.port = +process.env.PORT;
        this.mongoUri = process.env.MONGODB_URI;
    }

    configureApplication(){
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ type: 'application/json' }));
    }

    connectToDB(){
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUri, { useNewUrlParser:true });

        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "GoTour TripList MS: Connection error: "));
        this.db.once("open", function () {
            logger.info("GoTour TripList MS: Connected successfully - "+ new Date());
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
            logger.info(`GoTour TripList MS: Server started at port: ${this.port} at ${new Date()}`);
        })        
    }
}

const server = new Server();

export default server;