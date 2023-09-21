import React, { useEffect, useState } from 'react';
import InputComponent from '../../Components/Input';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../../Slices/podcastSlice';
import Podcastcard from '../../Components/PodcastCard/Podcastcard';
import "./Podcasts.css"
import Loader from '../../Components/Loader/Loader';

const Podcasts = () => {

    const [searchTitle, setSearchTitle] = useState("");

    const dispatch = useDispatch();

    const podcastData = useSelector((state) => { return state.podcasts.podcasts });

    const filteredPodcasts = podcastData.filter(podcast => {
        return podcast.title.trim().toLowerCase().includes(searchTitle.trim().toLowerCase());
    });

    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(
                query(collection(db, "podcasts"), orderBy("createdTime")),
                (querySnapshot) => {
                    const podcastsData = [];
                    querySnapshot.forEach((podcast) => {
                        podcastsData.push({ id: podcast.id, ...podcast.data() });
                    })
                    dispatch(setPodcasts(podcastsData));
                });
        } catch (error) {

        }
        return () => {
        }
    }, []);


    return (
        <div className='container podcasts-container' >
            <div className='inputContainer podcasts-main'>
                <h2>Discover Podcasts</h2>
                <InputComponent
                    type={"text"}
                    value={searchTitle}
                    setState={setSearchTitle}
                    placeholder={"Search By Title..."}
                />
                <div className="podcasts-section">
                    {
                        filteredPodcasts.length > 0 ?
                            filteredPodcasts.map((podcast) => {
                                return <Podcastcard
                                    displayImage={podcast.displayImage}
                                    title={podcast.title}
                                    id={podcast.id}
                                    key={podcast.id}
                                />
                            }) : <h2>No Podcasts Found</h2>
                    }
                </div>
            </div>
        </div>
    );
}

export default Podcasts;
