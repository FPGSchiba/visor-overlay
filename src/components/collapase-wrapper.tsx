import * as React from 'react';
import { IconButton, Slide, Box, FormControlLabel } from '@mui/material';
import Logo from '../resources/logo.png';

export function CollapseWrapper(props: any) {
    const { children } = props;
    const [checked, setChecked] = React.useState(false);

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
            <Slide direction="right" in={checked} mountOnEnter unmountOnExit className='slider slider-slide'>
                <div>
                    {children}
                </div>
            </Slide>
        </Box>
    );
}