import { Checkbox, FormControlLabel, TextField, Tooltip } from "@mui/material";
import React from "react";

export function ZonesHelper(props: {formik: any, other: string}) {
    const { formik, other } = props;

    return (
        <div className="mReport mReport-form mReport-form__zones-wrapper">
            <FormControlLabel control={<Checkbox name="noFly" value={formik.values.noFly} onChange={formik.handleChange} />} label="No Fly Zone?" />
            <FormControlLabel control={<Checkbox name="armistice" value={formik.values.armistice} onChange={formik.handleChange} />} label="Armistice Zone?" />
            <FormControlLabel control={<Checkbox name="restricted" value={formik.values.restricted} onChange={formik.handleChange} />} label="Restricted Zone?" />
            <Tooltip title={other} arrow placement="right">
                <TextField 
                    label={"Other zone"}
                    name='other'
                    value={formik.values.other}
                    onChange={formik.handleChange}
                    error={formik.touched.other && Boolean(formik.errors.other)}
                    helperText={formik.errors.other}
                    className='mReport mReport-form mReport-form__textfield other-textfield'
                />
            </Tooltip>
        </div>
    )
}