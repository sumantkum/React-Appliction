import React from "react";
import MovieItem from "./MovieItem";

const MoviesList = () => {

    const movies = [
        {
            id: 1,
            title: "Lizard",
            releaseDate: "2023-10-20",
            posterUrl: "https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg",
        },
        {
            id: 2,
            title: "Another Movie",
            releaseDate: "2023-10-21",
            posterUrl: "https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg",
        },
        {
            id: 3,
            title: "Yet Another Movie",
            releaseDate: "2023-10-22",
            posterUrl: "https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg",
        },
    ];


    return (

        <div className="card">
            {movies.map((movie) => (
                <MovieItem
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    posterUrl={movie.posterUrl}
                    id={movie.id}
                />
            ))}
        </div>
        
    );
};

export default MoviesList;
