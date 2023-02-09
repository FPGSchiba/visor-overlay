import { Autocomplete, AutocompleteRenderInputParams, Checkbox, Chip, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/format";
import data from '../../../shared/data.json';
import { DatePicker } from "@mui/x-date-pickers";

export function BasicInfo(props: {formik: any, updating: boolean}) {
    const { formik, updating } = props;
    const handle = useSelector((state: AppState) => state.authState.currentUser.handle);

    const codes = data.dropDown.visorCodes;

    return (
        <div className="helper helper-basic helper-basic__wrapper">
            <TextField 
                label={"Report Name"}
                name='reportName'
                value={formik.values.reportName}
                onChange={formik.handleChange}
                error={formik.touched.reportName && Boolean(formik.errors.reportName)}
                helperText={formik.errors.reportName}
                className='helper helper-basic helper-basic__textfield'
                disabled={!updating}
            />
            <TextField 
                label={"RSI Handle"}
                name='reportMeta.rsiHandle'
                value={formik.values.reportMeta.rsiHandle}
                onChange={formik.handleChange}
                className='helper helper-basic helper-basic__textfield handle'
                disabled={!updating || handle != ''}
            />
            <Select
                className="helper helper-basic helper-basic__select visorCode"
                value={formik.values.reportMeta.visorCode}
                labelId="visor-code-label"
                label="VISOR Code"
                name="reportMeta.visorCode"
                onChange={(e) => { 
                    formik.values.visorCodeJustification = '';
                    formik.handleChange(e);
                }}
                disabled={!updating}
            >
                { codes.map((value) => {
                    return (<MenuItem key={value.code} value={value.code}>{`[${value.code}] ${value.name}`}</MenuItem>)
                })}
            </Select>
            <TextField 
                label={"VISOR Code Explanation"}
                name='reportMeta.visorCodeJustification'
                value={formik.values.reportMeta.visorCodeJustification}
                onChange={formik.handleChange}
                className='helper helper-basic helper-basic__textfield visorCode-explanation'
                disabled={!(formik.values.reportMeta.visorCode == 5 || formik.values.reportMeta.visorCode == 6) || !updating}
            />
            <TextField 
                label={"Star Citizen Version"}
                name='reportMeta.scVersion'
                value={formik.values.reportMeta.scVersion}
                onChange={formik.handleChange}
                className='helper helper-basic helper-basic__textfield scVersion'
                disabled={!updating}
            />
            <DatePicker
                onChange={(value: any) => formik.setFieldValue("reportMeta.date", value, true)}
                value={formik.values.reportMeta.date}
                renderInput={(params) => (
                    <TextField
                        label="Date"
                        name="reportMeta.date"
                        {...params}
                    />
                )}
                className="helper helper-basic helper-basic__date"
                disabled={!updating}
            />
            <div className="helper helper-basic helper-basic__followup-wrapper">
                <FormControlLabel control={<Checkbox name="reportMeta.followupDiscovery" value={formik.values.reportMeta.followupDiscovery} checked={formik.values.reportMeta.followupDiscovery} onChange={formik.handleChange} disabled={!updating} />} label="Followup Discovery" />
                <FormControlLabel control={<Checkbox name="reportMeta.followupTrailblazers" value={formik.values.reportMeta.followupTrailblazers} checked={formik.values.reportMeta.followupTrailblazers} onChange={formik.handleChange} disabled={!updating} />} label="Followup Trailblazers" />
            </div>
            <TextField 
                label={"Followup Justification"}
                name='reportMeta.followupJustification'
                value={formik.values.reportMeta.followupJustification}
                onChange={formik.handleChange}
                className='helper helper-basic helper-basic__textfield justification'
                disabled={!(formik.values.reportMeta.followupTrailblazers || formik.values.reportMeta.followupDiscovery) || !updating}
            />
            <Autocomplete
                value={formik.values.keywords}
                multiple
                className="helper helper-basic helper-basic__autocomplete"
                options={[]}
                noOptionsText={'Please enter your Keywords to add.'}
                freeSolo
                renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                onChange={(e, value) => formik.setFieldValue('keywords', value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Keywords"
                        placeholder="Enter Keywords"
                    />
                )}
                disabled={!updating}
            />
        </div>
    )
}