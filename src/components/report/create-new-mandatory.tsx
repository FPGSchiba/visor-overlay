import { TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/format";
import * as Yup from 'yup';
import data from '../../shared/data.json';
import SystemSelect, { ObjectSelect, PlanetLevelOverwrite, PLOSelect, SystemOptionType } from "../functions/utils/system-select";
import { POITypeSelect } from "../functions/utils/location-select";
import { VISORCodeSelect } from "../functions/utils/visor-code-select";
import { DatePicker, DateTimePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { FollowUpHelper } from "../functions/utils/followups-helper";

export function CreateNewMandatory() {
    const [system, setSystem] = useState<SystemOptionType | null>(null);
    const [systemId, setSystemId] = useState('');
    const [object, setObject] = useState<SystemOptionType | null>(null);
    const [plo, setPLO] = useState<SystemOptionType | null>(null);
    const [poiType, setPoiType] = useState<SystemOptionType | null>(null);
    const [hasPlanetLevelObject, setHasPlanetLevelObject] = useState(false);
    const handle = useSelector((state: AppState) => state.authState.currentUser.handle);
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required!'),
        password: Yup.string().required('This field is required!'),
        remember: Yup.bool()
    });

    const initialValues = {
        reportName: '',
        jurisdiction: '',
        rsiHandle: handle, // Possibility: Load RSI Handle
        visorCode: 1,
        visorCodeJustification: '',
        scVersion: data.version,
        date: moment.now(),
        followUpTrailblazers: false,
        followUpDiscovery: false,
        followUpJustification: '',
        om1: 0,
        om2: 0,
        om3: 0,
        om4: 0,
        om5: 0,
        om6: 0,
      };
    
      const formik = useFormik({ initialValues, onSubmit: handleCreation, validationSchema });
    return (
        <div className="mReport">
            <form className="mReport mReport-form">
                <div className="mReport mReport-form mReport-form__wrapper">
                    <TextField 
                        label={"Report Name"}
                        name='reportName'
                        value={formik.values.reportName}
                        onChange={formik.handleChange}
                        error={formik.touched.reportName && Boolean(formik.errors.reportName)}
                        helperText={formik.errors.reportName}
                        className='mReport mReport-form mReport-form__textfield'
                    />
                    <div className="mReport mReport-form mReport-form__location">
                        <Typography className="mReport mReport-form mReport-form__location-header" variant="h5">Location</Typography>
                        <SystemSelect className="mReport mReport-form mReport-form__systems" value={system} setValue={setSystem} setId={setSystemId} />
                        <ObjectSelect className="mReport mReport-form mReport-form__objects" value={object} setValue={setObject} selectedSystem={system} selectedId={systemId} setPlanetLevelObject={setHasPlanetLevelObject} />
                        <PlanetLevelOverwrite hasPlanetLevelObject={hasPlanetLevelObject} setHasPlanetLevelObject={setHasPlanetLevelObject} />
                        { hasPlanetLevelObject ? (
                            <PLOSelect className="mReport mReport-form mReport-form__plo" value={plo} setValue={setPLO} selectedId={systemId} selectedStellarObject={object} />
                        ) : <div className="mReport mReport-form mReport-form__filler"></div>}
                        <POITypeSelect className="mReport mReport-form mReport-form__poi" value={poiType} setValue={setPoiType} />
                        <TextField 
                            label={"Jurisdiction"}
                            name='jurisdiction'
                            value={formik.values.jurisdiction}
                            onChange={formik.handleChange}
                            error={formik.touched.jurisdiction && Boolean(formik.errors.jurisdiction)}
                            helperText={formik.errors.jurisdiction}
                            className='mReport mReport-form mReport-form__textfield'
                        />
                    </div>
                    <div className="mReport mReport-form mReport-form__meta">
                        <Typography className="mReport mReport-form mReport-form__meta-header" variant="h5">Meta</Typography>
                        <TextField 
                            label={"RSI Handle"}
                            name='rsiHandle'
                            value={formik.values.rsiHandle}
                            onChange={formik.handleChange}
                            error={formik.touched.rsiHandle && Boolean(formik.errors.rsiHandle)}
                            helperText={formik.errors.rsiHandle}
                            className='mReport mReport-form mReport-form__textfield'
                        />
                        <VISORCodeSelect formik={formik}/>
                        <TextField 
                            label={"Star Citizen Version"}
                            name='scVersion'
                            value={formik.values.scVersion}
                            onChange={formik.handleChange}
                            error={formik.touched.scVersion && Boolean(formik.errors.scVersion)}
                            helperText={formik.errors.scVersion}
                            className='mReport mReport-form mReport-form__textfield'
                        />
                        <DatePicker
                            onChange={(value: any) => formik.setFieldValue("date", value, true)}
                            value={formik.values.date}
                            renderInput={(params) => (
                                <TextField
                                    error={Boolean(formik.touched.date && formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}
                                    label="Date"
                                    name="date"
                                    {...params}
                                />
                            )}
                        />
                        <FollowUpHelper formik={formik} />
                    </div>
                </div>
            </form>
        </div>
    )
}

function handleCreation(values: {
    reportName: string; system: string; stellarObject: string; planetLevelObject: string; poiType: string; jurisdiction: string; rsiHandle: string; // Possibility: Load RSI Handle
    visorCode: number; visorCodeJustification: string; scVersion: string; date: number; followUpTrailblazers: boolean; followUpDiscovery: boolean; followUpJustification: string; om1: number; om2: number; om3: number; om4: number; om5: number; om6: number;
}): void | Promise<any> {
    throw new Error("Function not implemented.");
}
