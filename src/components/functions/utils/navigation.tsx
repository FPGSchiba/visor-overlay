import { FilledInput, FormControl, FormLabel, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { IVISORNavigationGround, IVISORNavigationStation } from "../../../store/format/report.format";
import StraightLineOmsHelper from "./straight-om-helper";

export function Navigation(props: {formik: any, updating: boolean}) {
    const { formik, updating } = props;

    if (!formik.values.navigation.refuelingGroundPoi) {
        formik.setFieldValue('navigation.refuelingGroundPoi', { name: '', distance: 0, bearing: 0 } as IVISORNavigationGround);
    }
    if (!formik.values.navigation.spaceStation) {
        formik.setFieldValue('navigation.spaceStation', { name: '', distance: 0 } as IVISORNavigationStation);
    }

    return ( // TODO: FuelConsumptions
        <div className="helper helper-nav helper-nav__wrapper">
            <div className="helper helper-nav helper-nav__om-wrapper">
                <Typography variant="h4" color={updating ? '#fff' : '#aaa'} className="helper helper-nav helper-nav__om-header" >Orbital Markers</Typography>
                <div className="helper helper-nav helper-nav__oms-left">
                    <FormControl variant="filled" className="helper helper-nav helper-nav__om-input">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om1"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.om1'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.om1}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om1">OM 1</FormLabel>
                    </FormControl>
                    <FormControl variant="filled" className="helper helper-nav helper-nav__om-input">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om3"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.om3'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.om3}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om3">OM 3</FormLabel>
                    </FormControl>
                    <FormControl variant="filled" className="helper helper-nav helper-nav__om-input">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om5"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.om5'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.om5}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">OM 5</FormLabel>
                    </FormControl>
                </div>
                <div className="helper helper-nav helper-nav__oms-right">
                <FormControl variant="filled" className="helper helper-nav helper-nav__om-input">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om2"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.om2'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.om2}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om2">OM 2</FormLabel>
                    </FormControl>
                    <FormControl variant="filled" className="helper helper-nav helper-nav__om-input">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om4"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.om4'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.om4}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om4">OM 4</FormLabel>
                    </FormControl>
                    <FormControl variant="filled" className="helper helper-nav helper-nav__om-input">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om6"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.om6'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.om6}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">OM 6</FormLabel>
                    </FormControl>
                </div>
            </div>
            <StraightLineOmsHelper formik={formik} disabled={!updating} />
            <div className="helper helper-nav helper-nav__poi-wrapper">
                <div className="helper helper-nav helper-nav__station">
                    <Typography variant="h5" className="helper helper-nav helper-nav__station-header">Nearest Space Station</Typography>
                    <TextField 
                        label={"Station Name"}
                        name='navigation.spaceStation.name'
                        value={formik.values.navigation.spaceStation.name}
                        onChange={formik.handleChange}
                        className='helper helper-nav helper-nav__textfield'
                        disabled={!updating}
                    />
                    <FormControl variant="filled" className="helper helper-nav helper-nav__distance">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om6"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.spaceStation.distance'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.spaceStation.distance}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Station Distance</FormLabel>
                    </FormControl>
                </div>
                <div className="helper helper-nav helper-nav__ground">
                <Typography variant="h5" className="helper helper-nav helper-nav__ground-header">Nearest Ground POI for refueling</Typography>
                    <TextField 
                        label={"Ground POI Name"}
                        name='navigation.refuelingGroundPoi.name'
                        value={formik.values.navigation.refuelingGroundPoi.name}
                        onChange={formik.handleChange}
                        className='helper helper-nav helper-nav__textfield'
                        disabled={!updating}
                    />
                    <FormControl variant="filled" className="helper helper-nav helper-nav__distance">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">km</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om6"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.refuelingGroundPoi.distance'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.refuelingGroundPoi.distance}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Ground POI Distance</FormLabel>
                    </FormControl>
                    <FormControl variant="filled" className="helper helper-nav helper-nav__bearing">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">{"° (degree)"}</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om6"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            name='navigation.refuelingGroundPoi.bearing'
                            onChange={formik.handleChange}
                            value={formik.values.navigation.refuelingGroundPoi.bearing}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Ground POI Bearing</FormLabel>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}