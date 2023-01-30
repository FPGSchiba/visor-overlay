import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";

export function FollowUpHelper(props: {formik: any}) {
    const {formik} = props;

    return (
        <div>
            <FormControlLabel control={<Checkbox name="followUpDiscovery" value={formik.values.followUpDiscovery} onChange={formik.handleChange} />} label="Followup Discovery" />
            <FormControlLabel control={<Checkbox name="followUpTrailblazers" value={formik.values.followUpTrailblazers} onChange={formik.handleChange} />} label="Followup Trailblazers" />
            <TextField 
                label={"Followup Justification"}
                name='followUpJustification'
                value={formik.values.followUpJustification}
                onChange={formik.handleChange}
                error={formik.touched.followUpJustification && Boolean(formik.errors.followUpJustification)}
                helperText={formik.errors.followUpJustification}
                className='mReport mReport-form mReport-form__textfield'
                disabled={!(formik.values.followUpDiscovery || formik.values.followUpTrailblazers)}
            />
        </div>
    )
}