
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    bookings: [{
        type: mongoose.Types.ObjectId, 
        ref: "Booking",
    }]

});
export default mongoose.model("User", userSchema);





