import React from 'react';
import '../styles/FeaturedMovie.css';

const FeaturedMovie = (item) => {
    return (
        <section className="featured">
            <div>{item.original_name}</div>
        </section>
    )
}

export default FeaturedMovie;