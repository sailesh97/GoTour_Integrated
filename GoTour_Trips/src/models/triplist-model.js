import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const TripListSchema = new Schema(
    {
        destinationName : {
            type : String,
            unique: true
        },
        placesToVisit : {
            type : Array
        },
        price : {
            type : Number
        },
        daysOfTravel : {
            type : Number
        }
    }
);

TripListSchema.plugin(uniqueValidator);

export default TripListSchema;