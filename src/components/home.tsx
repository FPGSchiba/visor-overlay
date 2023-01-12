import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PermissionWrapper } from "./users/permission-wrapper";

export function Home() {
    const navigate = useNavigate();

    const navigateTo = (to: string) => {
        navigate(to);
    }

    const navigateToTest = () => {
        navigateTo('/test');
    }

    const navigateToCreateNew = () => {
        navigateTo('/create-new');
    }
    
    const navigateToListAll = () => {
        navigateTo('/list-all');
    }

    const navigateToSearch = () => {
        navigateTo('/search');
    }

    const navigateToListLocal = () => {
        navigateTo('/list-local');
    }

    const navigateToUsers = () => {
        navigateTo('/users');
    }

    return (
        <div className="home">
            <div className="home home-header">
                <h1>VISOR 2.0 Navigation</h1>
            </div>
            <div className="home home-navigation">
                <Button variant="contained" onClick={navigateToCreateNew} color="primary" className="home home-navigation home-navigation__button">Create New</Button>
                <Button variant="contained" onClick={navigateToListAll} color="primary" className="home home-navigation home-navigation__button">List All</Button>
                <Button variant="contained" onClick={navigateToSearch} color="primary" className="home home-navigation home-navigation__button">Search</Button>
                <Button variant="contained" onClick={navigateToListLocal} color="primary" className="home home-navigation home-navigation__button">List Local</Button>
                <PermissionWrapper roles={['Admin']}>
                    <Button variant="contained" onClick={navigateToUsers} color="primary" className="home home-navigation home-navigation__button">Users</Button>
                </PermissionWrapper>
            </div>
            <div className="home home-footer">
                <h4>This Overlay is brought by you by: FPGSchiba</h4>
                <h5>This Overlay Connects to the VISOR 2.0 Database Developed and maintained by: Vanguard. More Infos at: https://vngd.net</h5>
            </div>
        </div>
    )
}