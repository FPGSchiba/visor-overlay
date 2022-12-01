import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function ListAll() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToHome = () => {
        navigateTo('/home');
    }
    return (
        <div className="list-all">
            <div className="list-all list-all-header">
                <h1>List All</h1>
            </div>
            <div className="list-all list-all-content">
            <Button variant="contained" onClick={navigateToHome} color="primary" className="list-all list-all-content list-all-content__button">Home</Button>
            </div>
        </div>
    )
}