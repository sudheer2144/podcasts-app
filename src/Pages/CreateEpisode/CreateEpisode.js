import React, { useState } from 'react';
import InputComponent from '../../Components/Input';
import FileInput from '../../Components/Input/FileInput';
import LoadingButton from '../../Components/Button/LoadingButton';
import { useParams } from 'react-router-dom';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const CreateEpisode = () => {

    const [episodeName, setEpisodeName] = useState("");
    const [episodeDescription, setEpisodeDescription] = useState("");
    const [audioFile, setAudioFile] = useState();
    const [loading, setLoading] = useState(false);

    const podcastId = useParams().id;

    async function handleClick() {

        if (episodeName && episodeDescription && audioFile && podcastId) {
            setLoading(true);
            try {
                const audioFileRef = ref(
                    storage,
                    `podcastEpisodes/${auth.currentUser.uid}/${Date.now()}`
                );

                await uploadBytes(audioFileRef, audioFile);

                const audioFileURL = await getDownloadURL(audioFileRef);

                const episodeData = {
                    title: episodeName,
                    description: episodeDescription,
                    audioFile: audioFileURL,
                    createdTime: Date.now(),
                    createdBy: auth.currentUser.uid
                }

                const docRef = await addDoc(collection(db, "podcasts", podcastId, "episodes"), episodeData);

                setEpisodeName("");
                setEpisodeDescription("");
                setAudioFile();

                toast.success("Episode Created.");

            } catch (error) {
                toast.error(error.message);
            }
            setLoading(false)
        }
        else {
            toast.info("Invalid Values !")
        }
    }

    return (
        <div className="container">
            <div className='inputContainer'>
                <h2>Create Episosde</h2>
                <InputComponent type={"text"} value={episodeName} setState={setEpisodeName} placeholder={"Episode Title"} />
                <InputComponent type={"text"} value={episodeDescription} setState={setEpisodeDescription} placeholder={"Episode Description"} />
                <FileInput labelText={"Select Audio File"} setFile={setAudioFile} file={audioFile} id={"audio-file"} accept={"audio/*"} />
                {
                    // loading ? <Loader height={"39px"} /> :
                    //     <Button text={"Create"} handleClick={handleClick} />
                    <LoadingButton onClcik={handleClick} loading={loading} text={"Create"} />
                }
            </div>
        </div>
    );
}

export default CreateEpisode;
