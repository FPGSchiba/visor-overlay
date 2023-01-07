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
    userToken: Yup.string().required('This field is required!'),
    orgToken: Yup.string().required('This field is required!'),
    remember: Yup.bool()
  });
  const handleLogin = (formValue: { userToken: string; orgToken: string, remember: boolean }) => {
    const { userToken, orgToken, remember } = formValue;
    setLoading(true);

    dispatch(doLogin(orgToken, userToken, remember, (error) => {
      setLoading(false);
      if (!error) {
        console.log('navigating')
        navigate('/home');
      } else {
        setError(true);
        if (error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('userToken or orgToken Incorrect.');
        }
      }
    }));
  };

  const initialValues = {
    userToken: '',
    orgToken: '',
    remember: false,
  };

  const formik = useFormik({ initialValues, onSubmit: handleLogin, validationSchema });


    return(
        <div className="login login-wrapper">
            <Typography variant="h2" component={'h1'} className="login login-header">Login</Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className="login login-form login-form__wrapper">
                    <TextField 
                        label={"User Token"}
                        name='userToken'
                        value={formik.values.userToken}
                        onChange={formik.handleChange}
                        error={formik.touched.userToken && Boolean(formik.errors.userToken)}
                        helperText={formik.errors.userToken}
                        className='login login-form login-form__input'
                    />
                    <TextField 
                        label={"Organization Token"}
                        name='orgToken'
                        value={formik.values.orgToken}
                        onChange={formik.handleChange}
                        error={formik.touched.orgToken && Boolean(formik.errors.orgToken)}
                        helperText={formik.touched.orgToken && formik.errors.orgToken}
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