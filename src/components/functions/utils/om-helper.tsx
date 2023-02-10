import { FilledInput, FormControl, FormLabel, InputAdornment, TextField } from "@mui/material";
import React from "react";

export function OMHelper(props: {formik: any}) {
    const { formik } = props;

    return (
        <div className="mReport mReport-form mReport-form__om-wrapper">
            <div className="mReport mReport-form mReport-form__oms-left">
                <FormControl variant="filled" className="mReport mReport-form mReport-form__om-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om1"
                        inputProps={{
                        'aria-label': 'distance',
                        }}
                        type="number"
                        name='om1'
                        value={formik.values.om1}
                        onChange={formik.handleChange}
                        error={formik.touched.om1 && Boolean(formik.errors.om1)}
                    />
                    <FormLabel id="filled-weight-helper-text-om1">OM 1*</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="mReport mReport-form mReport-form__om-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om3"
                        inputProps={{
                            'aria-label': 'distance',
                        }}
                        type="number"
                        name='om3'
                        value={formik.values.om3}
                        onChange={formik.handleChange}
                        error={formik.touched.om3 && Boolean(formik.errors.om3)}
                    />
                    <FormLabel id="filled-weight-helper-text-om3">OM 3*</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="mReport mReport-form mReport-form__om-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om5"
                        inputProps={{
                        'aria-label': 'distance',
                        }}
                        type="number"
                        name='om5'
                        value={formik.values.om5}
                        onChange={formik.handleChange}
                        error={formik.touched.om5 && Boolean(formik.errors.om5)}
                    />
                    <FormLabel id="filled-weight-helper-text-om5">OM 5*</FormLabel>
                </FormControl>
            </div>
            <div className="mReport mReport-form mReport-form__oms-right">
            <FormControl variant="filled" className="mReport mReport-form mReport-form__om-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om2"
                        inputProps={{
                        'aria-label': 'distance',
                        }}
                        type="number"
                        name='om2'
                        value={formik.values.om2}
                        onChange={formik.handleChange}
                        error={formik.touched.om2 && Boolean(formik.errors.om2)}
                    />
                    <FormLabel id="filled-weight-helper-text-om2">OM 2*</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="mReport mReport-form mReport-form__om-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om4"
                        inputProps={{
                        'aria-label': 'distance',
                        }}
                        type="number"
                        name='om4'
                        value={formik.values.om4}
                        onChange={formik.handleChange}
                        error={formik.touched.om4 && Boolean(formik.errors.om4)}
                    />
                    <FormLabel id="filled-weight-helper-text-om4">OM 4*</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="mReport mReport-form mReport-form__om-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">km</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om6"
                        inputProps={{
                        'aria-label': 'distance',
                        }}
                        type="number"
                        name='om6'
                        value={formik.values.om6}
                        onChange={formik.handleChange}
                        error={formik.touched.om6 && Boolean(formik.errors.om6)}
                    />
                    <FormLabel id="filled-weight-helper-text-om6">OM 6*</FormLabel>
                </FormControl>
            </div>
        </div>
    )
}