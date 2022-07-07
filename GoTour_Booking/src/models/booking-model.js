import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: String,
    },
    bookings:
    [
       {
        bookingId: {type: Number, unique: true},
        booking: String, 
        source: String,
        booking_date:{
            type: Date,
            default: Date.now
        },
        travel: { start:Date, end:Date },
        people : [String]
       }
    ],
    payments: [
        {
            invoice_number: {type:Number, unique: true},
            payment_method: String,
            payment_date: Date,
            amount:Number
        }
    ]  
});

BookingSchema.plugin(uniqueValidator);

export {BookingSchema};