import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { checkUserInfo } from '../services/util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = () => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const setVars = (currentAuth: boolean) => {
        setLoaded(true);
        if (!currentAuth) {
            navigate('/login');
        }
    }
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            checkUserInfo((currentAuth: boolean) => {
                setVars(currentAuth);
            });
        }
    
    }, [location])

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return loaded ? <Outlet /> : <CircularProgress />
}

export default PrivateRoute;
