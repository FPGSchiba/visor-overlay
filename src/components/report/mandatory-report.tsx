import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import data from '../../shared/data.json';
import SystemSelect, { ObjectSelect, SystemOptionType } from "../functions/utils/system-select";

export function MandatoryReport() {
    const [system, setSystem] = React.useState<SystemOptionType | null>(null);
    const [object, setObject] = React.useState<SystemOptionType | null>(null);
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required!'),
        password: Yup.string().required('This field is required!'),
        remember: Yup.bool()
    });

    const initialValues = {
        name: '',
        poiType: '',
        jurisdiction: '',
        rsiHandle: '', // Possibility: Load RSI Handle
        visorCode: 0,
        visorCodeJustification: '',
        scVersion: '1.17.4',
        date: Date.now(),
        followUpTrailblazers: false,
        followUpDiscovery: false,
        followUpJustification: '',
        om1: 0,
        om2: 0,
        om3: 0,
        om4: 0,
        om5: 0,
        om6: 0,
        groundPoiName: '',
        groundPoiDistance: 0,
        groundPoiBearing: 0,
        stationName: '',
        stationDistance: 0
      };
    
      const formik = useFormik({ initialValues, onSubmit: handleCreation, validationSchema });
    return (
        <div className="mReport">
            <form className="mReport mReport-form">
                <div className="mReport mReport-form mReport-form__wrapper">
                    <TextField 
                        label={"Report Name"}
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.errors.name}
                        className='mReport mReport-form mReport-form__textfield'
                    />
                    <div className="mReport mReport-form mReport-form__location">
                        <SystemSelect className="mReport mReport-form mReport-form__systems" value={system} setValue={setSystem} />
                        <ObjectSelect className="mReport mReport-form mReport-form__objects" value={object} setValue={setObject} selectedSystem={system} />
                    </div>
                </div>
            </form>
        </div>
    )
}

function handleCreation(values: {
    name: string; system: string; object: string; poiType: string; jurisdiction: string; rsiHandle: string; // Possibility: Load RSI Handle
    visorCode: number; visorCodeJustification: string; scVersion: string; date: number; followUpTrailblazers: boolean; followUpDiscovery: boolean; followUpJustification: string; om1: number; om2: number; om3: number; om4: number; om5: number; om6: number; groundPoiName: string; groundPoiDistance: number; groundPoiBearing: number; stationName: string; stationDistance: number;
}): void | Promise<any> {
    throw new Error("Function not implemented.");
}
