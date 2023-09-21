import React, { useState } from 'react';
import InputComponent from '../Input';
import LoadingButton from '../Button/LoadingButton';
import FileInput from '../Input/FileInput';
import Loader from '../Loader/Loader';
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Slices/userSlice';
import { toast } from 'react-toastify';

const UpdateProfile = ({ user, setWantUpdate }) => {
    const [name, setName] = useState(user.name);
    const [profileImage, setProfileImage] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function handleClick() {
        setLoading(true);
        if (profileImage) {

            deleteImage();

            const profileImageRef = ref(
                storage,
                `users/${user.uid}/${Date.now()}`
            );

            await uploadBytes(profileImageRef, profileImage);

            const imageURL = await getDownloadURL(profileImageRef);

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                profileImage: imageURL,
            }, { merge: true });

            dispatch(setUser({
                ...user,
                name: name,
                profileImage: imageURL,
            }))

        }
        else {
            updateUser();
        }
        setLoading(false);
        toast.success("Updated Successfully.");
        setWantUpdate(false);
    }

    async function updateUser() {
        await setDoc(doc(db, "users", user.uid), {
            name: name,
        }, { merge: true });
    }

    function deleteImage() {
        // Create a reference under which you want to list
        const listRef = ref(storage, `users/${user.uid}`);

        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    const deleteRef = ref(storage, itemRef.fullPath);
                    // Delete the file
                    deleteObject(deleteRef).then(() => {
                        // File deleted successfully
                        console.log("deleted");
                    }).catch((error) => {
                        // Uh-oh, an error occurred!
                    });

                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
    }

    return (
        <>
            <h2>Update Details</h2>
            <InputComponent type={"text"} value={name} setState={setName} placeholder={"Full Name"} />
            <FileInput labelText={"Select New Profile Image"} setFile={setProfileImage} file={profileImage} id={"profile-image"} accept={"image/*"} />
            {
                // loading ? <Loader height={"39px"} /> :
                //     <Button text={"SignUp"} handleClick={handleClick} loading={loading} />
                <LoadingButton onClcik={handleClick} loading={loading} text={"Submit"} />
            }
        </>
    );
}

export default UpdateProfile;
