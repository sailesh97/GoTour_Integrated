import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config()

import CustomerSchema from '../models/customer-model';
import { hash } from '../utilities/hashing';
import { logger } from "../utilities/logger";

const userCollectionName = process.env.USER_COLLECTION_NAME;
const Customer = mongoose.model(userCollectionName, CustomerSchema);

async function compare(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

const logError = (err) => {
    logger.error({time: new Date(), error: err})
}

// add customer - with encryption
export const addCustomer = async (req, res) => {
    
    let customer = req.body;
    customer.password = await hash(customer.password);
    let newCustomer = new Customer(customer);
    try {
        let returnedCustomer = await newCustomer.save();
        res.send(returnedCustomer);
    } catch (err) {
        if(err.message){
            let errObj = {
                error: err._message,
                message: err.message
            };
            logError(errObj);
            res.send(errObj);
        } else{
            logError(err);
            res.send(err);
        }
    }
}

export const signIn = async (req, res) => {
    try {
        let returnedCustomer = await Customer.findOne({ email: req.body.email });
        const validateCustomer = await compare(req.body.password, returnedCustomer.password);

        if (validateCustomer) {
            const user = req.body;
            const token = jwt.sign({user}, process.env.JWT_SECRET);
            res.send({ message: 'User Validated', token: token, customer: returnedCustomer });
        } else{
            logError({message: "Invalid Credentials"});
            res.send({ message: "Sorry not validate credentials :" + req.body.email });
        }
    } catch (err) {
        let errObj = { message: "Error Authenticating :" + req.body.email };
        logError(errObj);
        res.send(errObj);
    }
}

export const ensureToken = (req, res, next) => {
    // check for valid token
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else{
        console.log("Error happened");
        logError({message:"No Auth token available in header"});
        res.sendStatus(403);
    }
}

export const verifyToken = (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
            console.log(err);
            logError({message: "Invalid Token!!"});
            res.sendStatus(403);
        } else{
            next();
        }
    });
}

export const home = (req, res) => {
    res.json({ "message": "Welcome from Express" });
}