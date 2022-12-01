import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function ListLocal() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToHome = () => {
        navigateTo('/home');
    }
    return (
        <div className="list-local">
            <div className="list-local list-local-header">
                <h1>List Local</h1>
            </div>
            <div className="list-local list-local-content">
            <Button variant="contained" onClick={navigateToHome} color="primary" className="list-local list-local-content list-local-content__button">Home</Button>
            </div>
        </div>
    )
}