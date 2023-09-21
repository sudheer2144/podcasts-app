import React, { useState } from 'react';
import InputComponent from '../../Components/Input';
import FileInput from '../../Components/Input/FileInput';
import Button from '../../Components/Button';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import LoadingButton from '../../Components/Button/LoadingButton';

const CreatePodcast = () => {

    const [podcastName, setpodcastName] = useState("");
    const [podcastDescription, setPodcastDescription] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if (podcastName && podcastDescription && displayImage && bannerImage) {
            setLoading(true);
            try {
                const displayImageRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );

                await uploadBytes(displayImageRef, displayImage);

                const displayImageURL = await getDownloadURL(displayImageRef);

                const bannerImageRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );

                const uploadImage = await uploadBytes(bannerImageRef, bannerImage);

                const bannerImageURL = await getDownloadURL(bannerImageRef);

                const podcastData = {
                    title: podcastName,
                    descrption: podcastDescription,
                    displayImage: displayImageURL,
                    bannerImage: bannerImageURL,
                    createdTime: Date.now(),
                    createdBy: auth.currentUser.uid
                }

                const docRef = await addDoc(collection(db, "podcasts"), podcastData);

                setpodcastName("");
                setPodcastDescription("");
                setDisplayImage();
                setBannerImage();

                toast.success("Podcast Created.")
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
                <h2>Create Podcast</h2>
                <InputComponent type={"text"} value={podcastName} setState={setpodcastName} placeholder={"Podcast Title"} />
                <InputComponent type={"text"} value={podcastDescription} setState={setPodcastDescription} placeholder={"Podcast Description"} />
                <FileInput labelText={"Select Display Image"} setFile={setDisplayImage} file={displayImage} id={"display-image"} accept={"image/*"} />
                <FileInput labelText={"Select Banner Image"} setFile={setBannerImage} file={bannerImage} id={"banner-image"} accept={"image/*"} />
                {
                    <LoadingButton onClcik={handleClick} loading={loading} text={"Create"} />
                }
            </div>
        </div>
    );
}

export default CreatePodcast;
