import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CreateNew() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToHome = () => {
        navigateTo('/home');
    }
    return (
        <div className="create-new">
            <div className="create-new create-new-header">
                <h1>Create New</h1>
            </div>
            <div className="create-new create-new-content">
            <Button variant="contained" onClick={navigateToHome} color="primary" className="create-new create-new-content create-new-content__button">Home</Button>
            </div>
        </div>
    )
}