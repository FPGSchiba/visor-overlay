import { Button, CircularProgress, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, IUser } from "../../store/format";
import CloseIcon from '@mui/icons-material/Close';
import { deleteUser, getSpecificUser, updateUser } from "../../store/actions/user";

export function DeleteUser(props: {handle: string, setOpen: (open: boolean) => void, fetchUserData: () => void}) {
    const {setOpen, handle, fetchUserData} = props;
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [deletionToken, setDeletionToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const clearForm = () => {
        setError(false);
        setLoading(true);
        setReason('');
        setErrorText('');
    }

    const handleClose = () => {
        clearForm();
        setOpen(false);
    }

    const handleChange = (event: any) => {
        setReason(event.target.value);
    }

    const handleUpdate = () => {
        if (reason != '') {
            dispatch(
                deleteUser(orgToken, userToken, deletionToken, reason, (err) => {
                    if (!err) {
                        clearForm();
                        fetchUserData();
                        setOpen(false);
                    } else {
                        console.error(err);
                    }
                })
            );
        } else {
            setErrorText('Please provide a Valid Reason.')
            setError(true);
        }
    }

    useEffect(() => {
        if (handle != '') {
            dispatch(getSpecificUser(orgToken, userToken, handle, (err, data) => {
                if (!err && data) {
                    setDeletionToken(data.token);
                    setLoading(false);
                } else {
                    setErrorText(err.message);
                    setError(true);
                    setLoading(false);
                }
            }));
        }
    }, [handle, orgToken, userToken])

    return (
        <>
            { !loading ? (
                <div className="userDelete userDelete-wrapper">
                    <Typography className="userDelete userDelete-heading" variant="h5" >Deleting User: {handle}</Typography>
                    <Typography className="userDelete userDelete-subheading" variant="h6">Please provide a reason for deletion</Typography>
                    <IconButton className="userDelete userDelete-button" onClick={handleClose}><CloseIcon /></IconButton>
                    <div className="userDelete userDelete-form">
                        <TextField
                            value={reason}
                            onChange={handleChange}
                            label="Reason"
                            className="userDelete userDelete-form userDelete-form__input"
                        />
                        <Button variant="contained" onClick={handleUpdate} className="userDelete userDelete-form userDelete-form__button">Delete</Button>
                    </div>
                    { error ? (
                        <div className="userDelete userDelete-error userDelete-error__wrapper">
                            <Typography className="userDelete userDelete-error userDelete-error__text" variant="h6">{errorText}</Typography>
                        </div>
                    ) : null}
                </div>
            ) : <CircularProgress />}
        </>
    )
}