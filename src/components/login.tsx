import { Alert, Button, Checkbox, CircularProgress, Collapse, FormControlLabel, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { doLogin } from "../store/actions/user";
import CloseIcon from '@mui/icons-material/Close';

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

    dispatch(doLogin(username, password, remember, (error, result) => {
      setLoading(false);
      if (result) {
        navigate('/home');
      } else {
        setError(true);
        if (error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Username or Password Incorrect.');
        }
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
                    {loading ? (
                    <CircularProgress />
                  ): null}
                </div>
            </form>
            <Collapse in={error} className="login login-form login-form__collapse">
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    color='inherit'
                    onClick={() => {
                      setError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                className='login login-form login-form__error'
              >
                {errorMessage}
              </Alert>
            </Collapse>
        </div>
    )
}