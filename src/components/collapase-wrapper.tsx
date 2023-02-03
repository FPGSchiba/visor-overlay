/* eslint-disable no-useless-escape */
import  React, { useEffect, useState } from 'react';
import { IconButton, Slide, Box, FormControlLabel, Button } from '@mui/material';
import Logo from '../resources/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ViewHelper } from './view-helper';
import { useLocation } from 'react-router-dom';
import { UserInfo } from './users/user-info';
import { updateUserInfo } from '../store/actions/user';
import { useDispatch } from 'react-redux';

export function CollapseWrapper(props: any) {
    const { children } = props;
    const [checked, setChecked] = useState(false);
    const [usesData, setUsesData] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
    
    const dataLocations = [
        "\/test"
    ]

    const checkIfDataLocation = (loc: string) => {
        let setData = false;
        dataLocations.forEach(element => {
            if (loc.match(element)) {
                setUsesData(true)
                setData = true;
            }
        });
        if (!setData) {
            setUsesData(false);
        }
    }

    useEffect(() => {
        checkIfDataLocation(location.pathname);
        dispatch(
            updateUserInfo()
        );
    }, [location]);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const handleUserInfo = () => {
        setShowUserInfo((prev) => !prev);
    }


    return (
        <Box className='slider slider-wrapper'>
            <FormControlLabel
                className='slider slider-label'
                control={<IconButton aria-label="collapse" onClick={handleChange}><img src={`${Logo}`} className='slider slider-image'alt={'Visor 2.0 Logo'} loading="eager" /></IconButton>} 
                label={''} 
            />
            <Slide direction="down" in={checked && showUserInfo} mountOnEnter unmountOnExit className='slider slider-user-slide'>
                <div>
                    <div className='content-wrapper-top'>
                        <UserInfo setUserInfoOpen={setShowUserInfo} />
                    </div>
                </div>
            </Slide>
            <Slide direction='down' in={!showUserInfo && checked} className='slider slider-opener-slide'>
                <div>
                    <div className='slider slider-userOpener slider-userOpener__wrapper'>
                        <IconButton aria-label="collapse" onClick={handleUserInfo} className='slider slider-userOpener slider-userOpener__button'><AccountCircleIcon /></IconButton>
                    </div>
                </div>
            </Slide>

            <div className='slider slider-container'>
                <Slide direction="right" in={checked} mountOnEnter unmountOnExit className='slider slider-left-slide'>
                    <div>
                        {children}
                    </div>
                </Slide>
                {usesData ? (
                    <Slide direction='left' in={checked} mountOnEnter unmountOnExit className='slider slider-right-slide'>
                        <div>
                            <div className='content-wrapper-right'>
                                <ViewHelper />
                            </div>
                        </div>
                    </Slide>
                ) : null}
            </div>
        </Box>
    );
}