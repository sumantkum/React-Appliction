import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js';
import mongoose from 'mongoose';
import Admin from "../models/Admin.js"

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization?.split(" ")[1]; // Optional chaining to avoid errors if authorization header is missing

    // Check if token is missing or empty
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found" });
    }

    // Verify token
    let adminId;
    try {
        const decrypted = jwt.verify( extractedToken, process.env.SECRET_KEY );
        adminId = decrypted.id;
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }

    // Extract data from request body
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (
        !title && title.trim() === "" &&
        !description && description.trim() === "" &&
        !releaseDate && releaseDate.trim() === "" &&
        !posterUrl && posterUrl.trim() === "" &&
        !actors && actors.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    // Create new Movie
    let movie;
    try {
        movie = new Movie({
            title,
            description,
            releaseDate: new Date(`${releaseDate}`), // Convert releaseDate to Date object
            featured,
            actors,
            admin: adminId,
            posterUrl,
        });

        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({ session });
        adminUser.addedMovies.push(movie);
        await adminUser.save({ session })
        await session.commitTransaction();


        // movie = await movie.save(); // Use await to save the movie
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(201).json({ movie });
};

/// get the movie
export const getAllMovies = async (req, res, next) => {
    let movies;

    try {
        movies = await Movie.find();

    } catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching movies" });
    }

    if (!movies && movies.trim() === "") {
        return res.status(200).json({ messge: "Request Failed." });
    }
    return res.status(200).json({ movies })
}

export const getMovieById = async(req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id)
    } catch (error) {
        return console.log(error)
    }

    if(!movie){
        return res.status(404).json({message: "Invalid movie id"});
    }

    return res.status(200).json({movie})
}
