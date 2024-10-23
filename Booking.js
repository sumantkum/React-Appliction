import mongoose, { mongo } from "mongoose";

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true,   
    },
    date: {
        type: Date,
        required: true,  
    },
    seatNumber: {
        type: String,
        required: true,   
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,  
    },
});

// Export the Booking model based on the bookingSchema
export default mongoose.model("Booking", bookingSchema);
