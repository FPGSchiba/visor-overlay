import { Button, CircularProgress, IconButton, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, IUser } from "../../store/format";
import CloseIcon from '@mui/icons-material/Close';
import { getSpecificUser, updateUser } from "../../store/actions/user";

export function EditUser(props: {handle: string, setOpen: (open: boolean) => void, fetchUserData: () => void}) {
    const {setOpen, handle, fetchUserData} = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');

    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const clearForm = () => {
        setRole('');
        setLoading(true);
    }

    const handleClose = () => {
        clearForm();
        setOpen(false);
    }

    const handleChange = (event: any) => {
        setRole(event.target.value);
    }

    const handleUpdate = () => {
        dispatch(
            updateUser(orgToken, userToken, {handle, role}, (err) => {
                if (!err) {
                    fetchUserData();
                    setOpen(false);
                } else {
                    console.error(err);
                }
                clearForm();
            })
        );
    }

    useEffect(() => {
        if (handle != '') {
            dispatch(getSpecificUser(orgToken, userToken, handle, (err, data) => {
                if(!err && data) {
                    setRole(data.role);
                    setLoading(false);
                }
            }))
        }
    }, [userToken, orgToken, handle]);

    return (
        <div className="userEdit userEdit-wrapper">
            <Typography className="userEdit userEdit-heading" variant="h5" >Editing User: {handle}</Typography>
            <IconButton className="userEdit userEdit-button" onClick={handleClose}><CloseIcon /></IconButton>
            { !loading ? (
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
                    <Button variant="contained" onClick={handleUpdate} className="userEdit userEdit-form userEdit-form__button">Update</Button>
                </div>
            ) : <CircularProgress />}
        </div>
    )
}