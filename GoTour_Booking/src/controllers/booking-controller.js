import mongoose from "mongoose";
import { logger } from '../utilities/logger';
import { BookingSchema } from "../models/booking-model";

const Booking = mongoose.model('gotravelbooking', BookingSchema)

const logError = (err) => {
    logger.error({time: new Date(), error: err})
}

export const addBooking = (req, res) => {
    let newBooking = new Booking(req.body);
    newBooking.save((err, booking) => {
        if(err){
            logError(err);
            res.send(err);
        }
        res.json(booking)
    })
}

export const getAllBooking = (req, res) => {
    Booking.find({}, (err, bookings) => {
        if(err){
            logError(err);
            res.send(err);
        }
        res.json(bookings);
    })
} 

export const getBookingById = (req, res) => {
    Booking.findById(req.params.bookingId, (err, booking) => {
        if(err){
            logError(err);
            res.send()
        }
        res.json(booking)
    })
}

export const getBookingByUser = (req, res) => {
    Booking.find({'user': req.params.user}, (err, booking) => {
        if(err){
            logError(err);
            res.send(err)
        }
        res.json(booking)
    })
}

export const updateBooking = (req, res) => {
    Booking.findByIdAndUpdate({_id:req.params.bookingId}, req.body, {new:true}, (err, updateBooking) => {
        if(err){
            logError(err);
            res.send(err);
        }
        res.json(booking)
    })
}

export const deleteBooking = (req, res) => {
    Booking.findByIdAndDelete({ _id: req.params.bookingId }, (err, data) => {
        if (err) {
            logError(err);
            res.send(err);
        }
        res.json({ message: "Booking deleted successfully", data });
    })
}

export const home = (req, res, next) => {
    res.json({"message": "Welcome to express js - Booking" })
}

