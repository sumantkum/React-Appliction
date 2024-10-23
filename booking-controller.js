import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

/// New Booking Movie
export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    // Validate required fields
    if (!movie || !date || !seatNumber || !user) {
        return res.status(422).json({ message: "All fields are required." });
    }

    let existingMovie; // Corrected variable name from existingMoive to existingMovie
    let existingUser;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Error finding user or movie." }); // Added error handling for finding user or movie
    }

    if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found with given ID" });
    }
    if (!existingUser) { // Check existingUser instead of user
        return res.status(404).json({ message: "User not found with given ID" });
    }

    let booking;

    try {
        booking = new Booking({
            movie,
            date: new Date(date), // Convert date to Date object
            seatNumber,
            user,
        });

        const session = await mongoose.startSession(); // Use await to correctly start the session
        session.startTransaction();
        
        existingUser.bookings.push(booking); // Add booking to user's bookings
        existingMovie.bookings.push(booking); // Add booking to movie's bookings
        
        await existingUser.save({ session }); // Save user with session
        await existingMovie.save({ session }); // Save movie with session
        await booking.save({ session }); // Save booking with session

        await session.commitTransaction(); // Commit the transaction
        session.endSession(); // Always end the session
    } catch (error) {
        console.error(error); // Log the error for debugging
        await session.abortTransaction(); // Rollback transaction on error
        return res.status(500).json({ message: "Unable to create a booking." });
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to create a booking." });
    }

    return res.status(201).json({ booking }); // Return the created booking
};

/// Get Booking movie
export const getBookingById = async(req, res, next) =>{
    const id = req.params.id;
    let booking;

    try {
        booking = await Booking.findById(id)
    } catch (error) {
        return console.log(error)
    }

    if(!booking){
        return res.status(500).json({message: "Unexpected Error"});
    }
    return res.status(200).json({booking})
}

/// Delete Booking Movie
export const deleteBooking = async()=>{
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndDelete(id).populate("user movie");
        console.log(booking)
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});

    } catch (error) {
        return console.log(error)
    }
    if(!booking){
        return res.status(404).json({message: "Unable to Delete"});
    }
    return res.status(200).json({message: "Successfully Deleted Movie"})


}