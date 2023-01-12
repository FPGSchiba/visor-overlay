import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkUserInfo } from '../services/util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = () => {
    const [auth, setAuth] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        async function isAuthenticated() {
            setAuth(await checkUserInfo());
            setLoaded(true);
        }

        isAuthenticated();
    }, []);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : loaded ? <Navigate to="/login" /> : null;
}

export default PrivateRoute;
