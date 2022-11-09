import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToTest = () => {
        navigateTo('/test');
    }
    
    return (
        <div className="home">
            <div className="home home-header">
                <h1>VISOR 2.0 Navigation</h1>
            </div>
            <div className="home home-navigation">
                <Button variant="contained" onClick={navigateToTest} color="primary" className="home home-navigation home-navigation__button">Test</Button>
                <Button variant="contained" onClick={navigateToTest} color="primary" className="home home-navigation home-navigation__button">Test</Button>
                <Button variant="contained" onClick={navigateToTest} color="primary" className="home home-navigation home-navigation__button">Test</Button>
                <Button variant="contained" onClick={navigateToTest} color="primary" className="home home-navigation home-navigation__button">Test</Button>
            </div>
            <div className="home home-footer">
                <h4>This Overlay is brought by you by: FPGSchiba</h4>
                <h5>This Overlay Connects to the VISOR 2.0 Database Developed and maintained by: Vanguard. More Infos at: https://vngd.net</h5>
            </div>
        </div>
    )
}