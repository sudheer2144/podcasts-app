import React, { useEffect, useRef, useState } from 'react';
import "./AudioPlayer.css";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useFetcher } from 'react-router-dom';


const AudioPlayer = ({ displayImage, episode, podcast, username }) => {

    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [isMute, setIsMute] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTIme] = useState(0);

    const audioRef = useRef();

    function handlePlayPause() {
        setIsPlaying(!isPlaying);
    }

    function handleMuteUnmute() {
        setIsMute(!isMute);
    }

    function handleVolume(e) {
        const volume = parseFloat(e.target.value)
        setVolume(volume);
        audioRef.current.volume = volume;
    }

    function handleDuration(e) {
        const currentTime = parseFloat(e.target.value)
        setCurrentTIme(currentTime);
        audioRef.current.currentTime = currentTime;
    }

    useEffect(() => {
        const audio = audioRef.current;
        audioRef.current.play();
        setIsPlaying(true);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [episode.id]);

    function handleTimeUpdate() {
        setCurrentTIme(Math.floor(audioRef.current.currentTime));
    };

    function handleLoadedMetadata() {
        setDuration(audioRef.current.duration);
    };

    function handleEnded() {
        setIsPlaying(false);
        setIsMute(false);
        setCurrentTIme(0);
        handleLoadedMetadata();
        setVolume(1);
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            if (duration === 0) {

            }
        }
        else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isMute) {
            audioRef.current.volume = 0;
            setVolume(0);
        } else {
            audioRef.current.volume = 1;
            setVolume(1);
        }
    }, [isMute]);

    function getActualTime(duration, currentTime) {
        const actualTime = duration - currentTime
        const mm = Math.floor(actualTime / 60);
        const ss = Math.floor(actualTime % 60);
        return `${mm}:${ss < 10 ? "0" : ""}${ss}`
    }

    return (
        <div className="player-main-container">
            <div className='custom-player'>
                <audio src={episode.audioFile} ref={audioRef}></audio>
                <div className="play-info">
                    <img className={`audio-image ${isPlaying ? "audio-image-playing" : ""}`} src={displayImage} alt="" />
                    <div className="play-details">
                        <p className='play-title'>{episode.title}</p>
                        <p className='podcast-info'>{podcast.title} By "{username}"</p>
                    </div>
                </div>
                <div className="duration-main">
                    <div className='duration-container'>
                        <p onClick={handlePlayPause} className='logo-p logo'>
                            {
                                isPlaying ? <FaPause /> : <FaPlay />
                            }
                        </p>
                        <input
                            type="range"
                            className='duration-range'
                            min={0}
                            max={duration}
                            step={1}
                            onChange={handleDuration}
                            value={currentTime}
                        />
                        <p className='duration'>{getActualTime(duration, currentTime)}</p>
                    </div>
                </div>
                <div className='volume-container'>
                    <p onClick={handleMuteUnmute} className='logo-v logo'>
                        {
                            isMute ? <FaVolumeMute /> : <FaVolumeUp />
                        }
                    </p>
                    <input
                        type="range"
                        className='volume-range'
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolume}
                        value={volume}
                    />
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
