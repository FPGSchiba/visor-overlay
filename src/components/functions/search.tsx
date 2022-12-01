import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Search() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToHome = () => {
        navigateTo('/home');
    }
    return (
        <div className="search">
            <div className="search search-header">
                <h1>Search</h1>
            </div>
            <div className="search search-content">
            <Button variant="contained" onClick={navigateToHome} color="primary" className="search search-content search-content__button">Home</Button>
            </div>
        </div>
    )
}