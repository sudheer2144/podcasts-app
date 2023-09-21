import React, { useEffect, useState } from 'react';
import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import "./PodcastDetails.css"
import { toast } from 'react-toastify';
import LoadingButton from '../../Components/Button/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { setEpisodes } from '../../Slices/episodeSlice';
import EpisodeCard from '../../Components/EpisodeCard/EpisodeCard';
import AudioPlayer from '../../Components/AudioPlayer/AudioPlayer';

const PodcastDetails = () => {

    const id = useParams().id;

    const [podcastData, setPodcastData] = useState({});

    const episodesData = useSelector(state => state.episodes.episodes);

    const [playingEpisode, setPlayingEpisode] = useState();

    const [userdata, setUserdata] = useState({});


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getPodcastData();
        getEpisodeData();
    }, [id]);

    useEffect(() => {
        getUserdata();
    }, [podcastData]);

    async function getPodcastData() {
        try {
            const docRef = doc(db, "podcasts", id);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPodcastData({ id: id, ...docSnap.data() });
            } else {
                toast.error("No such document!");
                navigate("/podcasts");
            }
        } catch (err) {

        }
    }

    async function getUserdata() {
        if (podcastData) {
            try {
                const podcastId = podcastData.createdBy;
                const docRef = doc(db, "users", podcastId);

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserdata({ ...docSnap.data() });
                } else {
                    toast.error("No such document!");
                    navigate("/podcasts");
                }
            } catch (err) {
            }
        }
    }

    async function getEpisodeData() {
        try {
            const unsubscribe = onSnapshot(
                query(collection(db, "podcasts", id, "episodes"), orderBy("createdTime")),
                (querySnapshot) => {
                    const episodesData = [];
                    querySnapshot.forEach((episode) => {
                        episodesData.push({ id: episode.id, ...episode.data() });
                    })
                    dispatch(setEpisodes(episodesData));
                });
        }
        catch (e) {
            toast.error("Something went wrong.");
            navigate("/podcasts")
        }
    }

    function handleClick() {
        navigate(`/podcast/${id}/create-episode`);
    }

    return (
        <div className="podcast-details-container">
            <div className='inputContainer podcast-details'>
                <h2>Podcast Details</h2>
                <div className='podcast-details button-section'>
                    <h2>{podcastData.title}</h2>
                    {
                        podcastData.createdBy == auth.currentUser.uid &&
                        <LoadingButton text='Create Episode' onClcik={handleClick} />
                    }
                </div>
                <img src={podcastData.bannerImage} alt="" />
                <p>{podcastData.descrption}</p>
                {
                    episodesData.map((episode, index) => {
                        return <EpisodeCard
                            episode={episode}
                            key={index}
                            onClick={(episode) => { setPlayingEpisode(episode) }}
                        />
                    })
                }
            </div>
            <div className='audio-player'>
                {
                    playingEpisode && userdata &&
                    <AudioPlayer
                        displayImage={podcastData.displayImage}
                        episode={playingEpisode}
                        podcast={podcastData}
                        username={userdata.name}

                    />
                }
            </div>
        </div >
    );
}

export default PodcastDetails;
