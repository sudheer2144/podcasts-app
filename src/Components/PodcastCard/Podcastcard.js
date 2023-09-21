import React from 'react';
import { Link } from 'react-router-dom';
import "./Podcast.css"

const Podcastcard = ({ displayImage, title, id }) => {
    return (
        <Link to={`/podcast/${id}`}>
            <div className='podcast-card' key={id}>
                <img src={displayImage} alt="Image Not Available" className='display-image-podcast' />
                <p>{title}</p>
            </div>
        </Link>
    );
}

export default Podcastcard;
