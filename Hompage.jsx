import React from 'react';
import './Homepage.css';
import MovieItem from './Movies/MovieItem';

const Homepage = () => {
    return (
        <div>
            <div className="homepage-root"> {/* Main container */}
                <div className="hero-section"> {/* Hero section container */}
                    <img
                        src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
                        alt="Brahmastra movie poster"
                        className="hero-image"  // Hero image class
                    />
                </div>
                <div className="hero-text">
                    <h1> <span>Welcome to Movie Releases For More Latest Update to Follow me  </span> </h1>
                    {/* <p>Discover the latest blockbuster hits!</p> */}
                </div>
            </div>
            <MovieItem/>
        </div>
    );
};

export default Homepage;