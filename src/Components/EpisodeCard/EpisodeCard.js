import React, { useState } from 'react';
import Button from '../Button';
import { FaPlay, FaPause } from 'react-icons/fa';
import "./EpisodeCard.css"

const EpisodeCard = ({ episode, onClick }) => {

    function playAudio() {
        onClick(episode);
    }

    return (
        <div className='episode-card'>
            {/* <h1>Episode1</h1> */}
            <div className="episode-info">
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
            </div>
            <div className="media-info">
                <Button handleClick={playAudio}>
                    <FaPlay />
                </Button>
            </div>
        </div>
    );
}

export default EpisodeCard;
