import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
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
                <h1>404 Not found</h1>
            </div>
            <div className="not-found not-found-content">
                <h2 className="not-found not-found-content not-found-content__message">This is quite Unexpected, just return to the home Menu.</h2>
                <Button variant="contained" onClick={navigateToHome} color="primary" className="not-found not-found-content not-found-content__button">Home</Button>
                <h3 className="not-found not-found-content not-found-content__report">This is a error 404 so the Page the App was looking for does not exist. <br /><br /> Please also report this Bug to FPGSchiba for fixing this :D Thanks</h3>
            </div>
        </div>
    )
}