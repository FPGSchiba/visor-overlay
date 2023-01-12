import { CircularProgress, IconButton, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, IUser } from "../../store/format";
import CloseIcon from '@mui/icons-material/Close';
import { getSpecificUser } from "../../store/actions/user";
import { ErrorResponse } from "@remix-run/router";

export function EditUser(props: {handle: string, setOpen: (open: boolean) => void}) {
    const {setOpen, handle} = props;
    const dispatch = useDispatch();
    const [currentRole, setCurrentRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');

    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event: any) => {
        setCurrentRole(event.target.value);
    }

    const handleUpdate = () => {
        // TODO: uUpdate User
    }

    useEffect(() => {
        if (handle) {
            dispatch(getSpecificUser(orgToken, userToken, handle, (err, data) => {
                if(!err && data) {
                    setCurrentRole(data.role);
                    setLoading(false);
                }
            }))
        }
    }, [userToken, orgToken, handle]);

    return (
        <div className="userEdit userEdit-wrapper">
            <Typography className="userEdit userEdit-heading" variant="h5" >Editing User: {handle}</Typography>
            <IconButton className="userEdit userEdit-button" onClick={handleClose}><CloseIcon /></IconButton>
            { !loading && currentRole ? (
                <div className="userEdit userEdit-form">
                    <Select
                        value={role}
                        label="Role"
                        onChange={handleChange}
                        className='userEdit userEdit-form userEdit-form__select'
                        labelId="userEdit-form__select"
                    >
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        <MenuItem value={'Contributor'}>Contributor</MenuItem>
                        <MenuItem value={'Editor'}>Editor</MenuItem>
                    </Select>
                </div>
            ) : <CircularProgress />}
        </div>
    )
}