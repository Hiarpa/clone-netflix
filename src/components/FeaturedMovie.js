import React from 'react';
import '../styles/FeaturedMovie.css';
// eslint-disable-next-line 
export default (item => {
    return(
        <section className="featured">
            <div>{item.original_name}</div>
        </section>
    )
})