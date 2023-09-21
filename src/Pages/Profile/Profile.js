import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import LoadingButton from '../../Components/Button/LoadingButton';
import "./Profile.css"
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../Slices/userSlice';
import UpdateProfile from '../../Components/UpdateProfile/UpdateProfile';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [wantUpdate, setWantUpdate] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick() {
        setLoading(true);
        signOut(auth).then(() => {
            toast.success("Logout Successfull.");
            setLoading(false);
            dispatch(clearUser());
            navigate("/");
        }).catch((err) => {
            toast.error(err.message);
            setLoading(false);
        });
    }
    return (
        <div className="container profile-container">
            <div className='inputContainer profile-main'>
                {
                    !user && <Loader />
                }
                {
                    user && !wantUpdate &&
                    <>
                        <h2>Profile</h2>
                        <img src={user.profileImage} alt="userImage" />
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        {/* <p>{user.uid}</p> */}
                        <LoadingButton text={"Logout"} onClcik={handleClick} loading={loading} />
                    </>
                }
                {
                    user && wantUpdate &&
                    <UpdateProfile user={user} setWantUpdate={setWantUpdate} />
                }
            </div>
            {!wantUpdate && <p className='update-profile' onClick={() => { setWantUpdate(true) }}>Click here to update details.</p>}
            {wantUpdate && <p className='update-profile' onClick={() => { setWantUpdate(false) }}>Go Back.</p>}
            <br />
            {user && wantUpdate && <p>only update required fields remaining leave as it is.</p>}
        </div>
    );
};


export default Profile;
