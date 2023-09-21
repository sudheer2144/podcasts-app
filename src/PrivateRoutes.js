import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Loader from './Components/Loader/Loader';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoutes = () => {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loader />
    }
    else if (!user || error) {
        toast.warn("PLease Login or SignUp !")
        return <Navigate to={"/"} replace />
    }
    return (
        <Outlet />
    );
}

export default PrivateRoutes;
