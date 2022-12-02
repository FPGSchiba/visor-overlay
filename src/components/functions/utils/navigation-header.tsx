import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function NavigationHeader(props: {header: string}) {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToHome = () => {
        navigateTo('/home');
    }
    return (
        <div className="navigation">
            <div className={`navigation navigation-content`}>
                <Button variant="contained" onClick={navigateToHome} color="primary" className={`navigation navigation-content navigation-content__button`}>{"< Home"}</Button>
            </div>
            <div className={`navigation navigation-header`}>
                <h1>{props.header}</h1>
            </div>
        </div>
    )
}