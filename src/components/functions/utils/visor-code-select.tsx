import { MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import data from "../../../shared/data.json";

export function VISORCodeSelect(props: {formik: any}) {
    const { formik } = props;
    const codes = data.dropDown.visorCodes;

    return (
        <div className="mReport mReport-form mReport-form__visorCode-wrapper">
            <Select
                className="mReport mReport-form mReport-form__select"
                value={formik.values.visorCode}
                labelId="visor-code-label"
                label="VISOR Code"
                name="visorCode"
                onChange={(e) => { 
                    formik.values.visorCodeJustification = '';
                    formik.handleChange(e);
                }}
            >
                { codes.map((value) => {
                    return (<MenuItem key={value.code} value={value.code}>{value.name}</MenuItem>)
                })}
            </Select>
            <TextField 
                label={"Explanation"}
                name='visorCodeJustification'
                value={formik.values.visorCodeJustification}
                onChange={formik.handleChange}
                error={formik.touched.visorCodeJustification && Boolean(formik.errors.visorCodeJustification)}
                helperText={formik.errors.visorCodeJustification}
                className='mReport mReport-form mReport-form__textfield'
                disabled={!(formik.values.visorCode == 5 || formik.values.visorCode == 6)}
            />
        </div>
    )
}