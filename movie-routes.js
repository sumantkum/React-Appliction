import express from 'express'
import { addMovie, getAllMovies, getMovieById } from '../Controller/movie-controller.js';

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

// movieRouter.

export default movieRouter;

/// get the movie
