import { Button, FilledInput, FormControl, FormLabel, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IVISORFuelConsumption, IVISORNavigationGround, IVISORNavigationStation } from "../../../store/format/report.format";
import StraightLineOmsHelper from "./straight-om-helper";

export function Navigation(props: {formik: any, updating: boolean}) {
    const { formik, updating } = props;

    const [pointA, setPointA] = useState('');
    const [pointB, setPointB] = useState('');
    const [ship, setShip] = useState('');
    const [drive, setDrive] = useState('');
    const [distance, setDistance] = useState(0);
    const [consumption, setConsumption] = useState(0);

    const handleAdd = () => {
        if (pointA != '' && pointB != '' && ship != '' && distance != 0) {
            const value: IVISORFuelConsumption = {
                pointA: {
                    name: pointA
                },
                pointB: {
                    name: pointB
                },
                drive,
                ship,
                distance,
                fuelConsumption: consumption
            }
            if (formik.values.fuelConsumptions && formik.values.fuelConsumptions.length > 0) {
                const temp = formik.values.fuelConsumptions;
                temp.push(value);
                formik.setFieldValue('fuelConsumptions', temp);
            } else {
                formik.setFieldValue('fuelConsumptions', [value]);
            }
        }
    }
 
    useEffect(() => {
        if (!formik.values.navigation.refuelingGroundPoi) {
            formik.setFieldValue('navigation.refuelingGroundPoi', { name: '', distance: 0, bearing: 0 } as IVISORNavigationGround);
        }
        if (!formik.values.navigation.spaceStation) {
            formik.setFieldValue('navigation.spaceStation', { name: '', distance: 0 } as IVISORNavigationStation);
        }
    }, [])

    return ( 
        <div className="helper helper-nav helper-nav__wrapper">
            <div className="helper helper-nav helper-nav__om-wrapper">
                <Typography variant="h5" color={updating ? '#fff' : '#aaa'} className="helper helper-nav helper-nav__om-header" >Orbital Markers</Typography>
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
                    <Typography variant="h5" color={updating ? '#fff' : '#aaa'} className="helper helper-nav helper-nav__station-header">Nearest Space Station</Typography>
                    <TextField 
                        label={"Station Name"}
                        name='navigation.spaceStation.name'
                        value={formik.values.navigation.spaceStation && formik.values.navigation.spaceStation.name ? formik.values.navigation.spaceStation.name : ''}
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
                            value={formik.values.navigation.spaceStation && formik.values.navigation.spaceStation.distance ? formik.values.navigation.spaceStation.distance : 0}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Station Distance</FormLabel>
                    </FormControl>
                </div>
                <div className="helper helper-nav helper-nav__ground">
                <Typography variant="h5" color={updating ? '#fff' : '#aaa'} className="helper helper-nav helper-nav__ground-header">Nearest Ground POI for refueling</Typography>
                    <TextField 
                        label={"Ground POI Name"}
                        name='navigation.refuelingGroundPoi.name'
                        value={formik.values.navigation.refuelingGroundPoi && formik.values.navigation.refuelingGroundPoi.name ? formik.values.navigation.refuelingGroundPoi.name : ''}
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
                            value={formik.values.navigation.refuelingGroundPoi && formik.values.navigation.refuelingGroundPoi.distance ? formik.values.navigation.refuelingGroundPoi.distance : 0}
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
                            value={formik.values.navigation.refuelingGroundPoi && formik.values.navigation.refuelingGroundPoi.bearing ? formik.values.navigation.refuelingGroundPoi.bearing : 0}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Ground POI Bearing</FormLabel>
                    </FormControl>
                </div>
            </div>
            <div className="helper helper-nav helper-nav__fuel-wrapper">
                <Typography variant="h5" color={updating ? '#fff' : '#aaa'} className="helper helper-nav helper-nav__fuel-header" >Fuel Consumptions</Typography>
                <div className="helper helper-nav helper-nav__fuel-input">
                    <TextField 
                        label={"Point A"}
                        value={pointA}
                        onChange={(event) => setPointA(event.target.value)}
                        className='helper helper-nav helper-nav__textfield pointA'
                        disabled={!updating}
                    />
                    <TextField 
                        label={"Point B"}
                        value={pointB}
                        onChange={(event) => setPointB(event.target.value)}
                        className='helper helper-nav helper-nav__textfield pointB'
                        disabled={!updating}
                    />
                    <TextField 
                        label={"Ship"}
                        value={ship}
                        onChange={(event) => setShip(event.target.value)}
                        className='helper helper-nav helper-nav__textfield'
                        disabled={!updating}
                    />
                    <TextField 
                        label={"Quantum Drive"}
                        value={drive}
                        onChange={(event) => setDrive(event.target.value)}
                        className='helper helper-nav helper-nav__textfield drive'
                        disabled={!updating}
                    />
                    <FormControl variant="filled" className="helper helper-nav helper-nav__fuel-distance">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">{"km"}</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om6"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            onChange={(event) => setDistance(+event.target.value)}
                            value={distance}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Distance</FormLabel>
                    </FormControl>
                    <FormControl variant="filled" className="helper helper-nav helper-nav__consumption">
                        <FilledInput
                            id="filled-adornment-weight"
                            endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">{"SCU"}</InputAdornment>}
                            aria-describedby="filled-weight-helper-text-om6"
                            inputProps={{
                                'aria-label': 'distance',
                            }}
                            type="number"
                            onChange={(event) => setConsumption(+event.target.value)}
                            value={consumption}
                            disabled={!updating}
                        />
                        <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om6">Fuel Consumption</FormLabel>
                    </FormControl>
                    <div className="helper helper-nav helper-nav__add-wrapper">
                        <Button variant="contained" className="helper helper-nav helper-nav__add" onClick={handleAdd} disabled={!updating} >Add</Button>
                    </div>
                </div>
                <div className="helper helper-nav helper-nav__fuel-view">
                    <Table className="helper helper-nav helper-nav__fuel-table" stickyHeader>
                        <TableHead>
                            <TableRow sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                    Point A
                                </TableCell>
                                <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                    Point B
                                </TableCell>
                                <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                    Distance
                                </TableCell>
                                <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                    Fuel Consumption
                                </TableCell>
                                <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                    Ship
                                </TableCell>
                                <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                    Quantum Drive
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formik.values.fuelConsumptions && formik.values.fuelConsumptions.length > 0 ? (
                                <>
                                    { formik.values.fuelConsumptions.map((value: IVISORFuelConsumption, index: number) => (
                                        <TableRow key={index} sx={updating ? {color: '#fff'} : {color: '#aaa'}}>
                                            <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>{value.pointA.name}</TableCell>
                                            <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>{value.pointB.name}</TableCell>
                                            <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>{value.distance}</TableCell>
                                            <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>{value.fuelConsumption}</TableCell>
                                            <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>{value.ship}</TableCell>
                                            <TableCell sx={updating ? {color: '#fff'} : {color: '#aaa'}}>{value.drive}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : null }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}