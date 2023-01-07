/* eslint-disable no-useless-escape */
import  React, { useEffect, useState } from 'react';
import { IconButton, Slide, Box, FormControlLabel } from '@mui/material';
import Logo from '../resources/logo.png';
import { checkUserInfo } from '../services/util';
import { ViewHelper } from './view-helper';
import { useLocation } from 'react-router-dom';

export function CollapseWrapper(props: any) {
    const { children } = props;
    const [checked, setChecked] = useState(false);
    const auth = checkUserInfo();
    const [usesData, setUsesData] = useState(false);
    const location = useLocation();
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
    }, [location]);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Box className='slider slider-wrapper'>
            <FormControlLabel
                className='slider slider-label'
                control={<IconButton aria-label="collapse" onClick={handleChange}><img src={`${Logo}`} className='slider slider-image'alt={'Visor 2.0 Logo'} loading="eager" /></IconButton>} 
                label={''} 
            />
            <div className='slider slider-container'>
                <Slide direction="right" in={checked} mountOnEnter unmountOnExit className='slider slider-left-slide'>
                    <div>
                        {children}
                    </div>
                </Slide>
                {auth && usesData ? (
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