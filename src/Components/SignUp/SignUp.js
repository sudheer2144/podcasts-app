import React, { useState } from 'react';
import InputComponent from '../Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import Button from '../Button';
import LoadingButton from '../Button/LoadingButton';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import FileInput from '../Input/FileInput';


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [profileImage, setProfileImage] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if (password === cnfPassword && password.length >= 8 && email && name && profileImage) {
            try {
                setLoading(true);

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const user = userCredentials.user;

                const profileImageRef = ref(
                    storage,
                    `users/${user.uid}/${Date.now()}`
                );

                await uploadBytes(profileImageRef, profileImage);

                const imageURL = await getDownloadURL(profileImageRef);

                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                    profileImage: imageURL,
                    uid: user.uid
                });

                dispatch(setUser({
                    name: name,
                    email: user.email,
                    profileImage: imageURL,
                    uid: user.uid
                }))
                toast.success("SignUp Success !")

                navigate("/");

            } catch (error) {
                if (error.message.indexOf("email") > -1) {
                    toast.error("Email already Taken !")
                } else {
                    toast.error("Please try again later !");
                }
                setLoading(false);
                console.log(error);
            }
        }
        else {
            if (password !== cnfPassword) {
                toast.warn("Password Mismatch.")
            }
            else {
                toast.info("Enter valid values !");
            }
            setLoading(false);
        }
    }

    return (
        <>
            <h2>SignUp</h2>
            <InputComponent type={"text"} value={name} setState={setName} placeholder={"Full Name"} />
            <InputComponent type={"email"} value={email} setState={setEmail} placeholder={"Email"} />
            <InputComponent type={"password"} value={password} setState={setPassword} placeholder={"Password"} />
            <InputComponent type={"password"} value={cnfPassword} setState={setCnfPassword} placeholder={"Confirm Password"} />
            <FileInput labelText={"Select Profile Image"} setFile={setProfileImage} file={profileImage} id={"profile-image"} accept={"image/*"} />
            {
                // loading ? <Loader height={"39px"} /> :
                //     <Button text={"SignUp"} handleClick={handleClick} loading={loading} />
                <LoadingButton onClcik={handleClick} loading={loading} text={"SignUp"} />
            }
        </>
    );
};


export default SignUp;
