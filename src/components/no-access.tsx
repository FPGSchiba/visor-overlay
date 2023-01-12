import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function NoAccess() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToHome = () => {
        navigateTo('home');
    }
    return(
        <div className="not-found">
            <div className="not-found not-found-header">
                <h1>403 Not enough rights</h1>
            </div>
            <div className="not-found not-found-content">
                <h2 className="not-found not-found-content not-found-content__message">This is quite Unexpected, please talk to your Leadership to get more rights and the access to this feature.</h2>
                <Button variant="contained" onClick={navigateToHome} color="primary" className="not-found not-found-content not-found-content__button">Home</Button>
                <h3 className="not-found not-found-content not-found-content__report">This is a error 403 so you do not have access to the feature you were trying to reach.<br /><br /> Please go to your Org Administration and request access if you need access.</h3>
            </div>
        </div>
    )
}