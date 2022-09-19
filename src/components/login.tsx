import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { doLogin } from "../store/actions/user";

export function Login() {
const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
    remember: Yup.bool()
  });
  const handleLogin = (formValue: { username: string; password: string, remember: boolean }) => {
    const { username, password, remember } = formValue;
    setLoading(true);

    dispatch(doLogin(username, password, remember, (error) => {
      setLoading(false);
      if (error) {
        setError(true);
        setErrorMessage(error.message);
      } else {
        navigate('/home');
      }
    }));
  };

  const initialValues = {
    username: '',
    password: '',
    remember: false,
  };

  const formik = useFormik({ initialValues, onSubmit: handleLogin, validationSchema });


    return(
        <div className="login login-wrapper">
            <Typography variant="h2" component={'h1'} className="login login-header">Login</Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className="login login-form login-form__wrapper">
                    <TextField 
                        label={"Username"}
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.errors.username}
                        className='login login-form login-form__input'
                    />
                    <TextField 
                        label={"Password"}
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        type='password'
                        helperText={formik.touched.password && formik.errors.password}
                        className='login login-form login-form__input'
                    />
                    <FormControlLabel control={
                        <Checkbox
                            value={formik.values.remember}
                            onChange={formik.handleChange}
                            name="remember" 
                        />}
                        label="Remember Login" 
                        className="login login-form login-form__remember"
                    />
                    <Button variant="contained" type="submit" color="primary" className="login login-form login-form__submit">Login</Button>
                </div>
            </form>
        </div>
    )
}