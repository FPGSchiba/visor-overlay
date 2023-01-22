import { Button, CircularProgress, IconButton, MenuItem, Select, TextField, Typography, useForkRef } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/format";
import CloseIcon from '@mui/icons-material/Close';
import { createUser } from "../../store/actions/user";
import { useFormik } from "formik";
import * as Yup from 'yup';

export function CreateUser(props: {setOpen: (open: boolean) => void, fetchUserData: () => void}) {
    const {setOpen, fetchUserData} = props;
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        handle: Yup.string().required('This field is required!'),
        role: Yup.string().required('This field is required!')
    });
    const initialValues = {
        role: '',
        handle: '',
    }

    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const handleClose = () => {
        formik.resetForm();
        setOpen(false);
    }

    const handleCreate = (formValue: { handle: string, role: string }) => {
        dispatch(
            createUser(orgToken, userToken, {handle: formValue.handle, role: formValue.role}, (err) => {
                if (!err) {
                    fetchUserData();
                    setOpen(false);
                } else {
                    console.error(err);
                }
            })
        );
    }

    const formik = useFormik({initialValues, onSubmit: handleCreate, validationSchema});

    return (
        <div className="userCreate userCreate-wrapper">
            <Typography className="userCreate userCreate-heading" variant="h5" >Creating User</Typography>
            <IconButton className="userCreate userCreate-button" onClick={handleClose}><CloseIcon /></IconButton>
            <form className="userCreate userCreate-form userCreate-form__wrapper" onSubmit={formik.handleSubmit}>
                <TextField
                    name="handle"
                    label="Handle"
                    value={formik.values.handle}
                    onChange={formik.handleChange}
                    error={formik.touched.handle && Boolean(formik.errors.handle)}
                    helperText={formik.errors.handle}
                    className="userCreate userCreate-form userCreate-form__input"
                />
                <Select
                    name="role"
                    value={formik.values.role}
                    label="Role"
                    onChange={formik.handleChange}
                    className='userCreate userCreate-form userCreate-form__select'
                    labelId="userCreate-form__select"
                    defaultValue='Editor'
                    error={formik.touched.handle && Boolean(formik.errors.handle)}
                >
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'Contributor'}>Contributor</MenuItem>
                    <MenuItem value={'Editor'}>Editor</MenuItem>
                </Select>
                <Button variant="contained" type="submit" className="userCreate userCreate-form userCreate-form__button">Create</Button>
            </form>
        </div>
    )
}