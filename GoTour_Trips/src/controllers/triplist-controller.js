import mongoose from "mongoose";
import DotEnv from 'dotenv';

import { logger } from "../utilities/logger";
import TripListSchema from "../models/triplist-model";


DotEnv.config();

const tripCollectionName = process.env.TRIP_COLLECTION_NAME;
const TripList = mongoose.model(tripCollectionName,TripListSchema);

const logError = (err) => {
    logger.error({time: new Date(), error: err})
}

export const addTripList = (req,res) => {
    let newTrip = new TripList(req.body);
    newTrip.save((err,triplist) => {
        if(err){
            logError(err);
            res.send(err);
        }
        res.json(triplist);
    });
}

export const getAllTripList = (req,res) => {
    TripList.find({},(err,triplist) => {
        if(err){
            logError(err);
            res.send(err);
        }
        res.json(triplist);
    });
}

export const deleteListById = (req,res) => {
    TripList.remove({_id:req.params.id},(err,data) => {
        if(err){
            logError(err);
            res.send(res);
        }
        res.json({ message: "Trip deleted successfully."});
    });
}