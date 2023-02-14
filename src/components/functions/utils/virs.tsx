import { Autocomplete, Checkbox, Chip, FilledInput, FormControl, FormControlLabel, FormLabel, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import React from "react";
import { IVISORVirs } from "../../../store/format/report.format";

export function VIRS(props: { formik: any, updating: boolean}) {
    const {formik, updating} = props;

    if (!formik.values.virs && typeof(formik.values.virs) != 'object') {
        const virs: IVISORVirs = {
            temperatureMeasures: [],
            breathable: false,
            externalPressure: 0,
            composition: '',
            pads: {
                ground: 0,
                ship: 0
            },
            surfaceElevation: 0,
            radiation: 0,
            gravity: 0,
            consoles: {
                trading: false,
                mining: false,
                finePayment: false,
                security: false,
                weaponSales: {
                    personal: false,
                    ship: false
                },
                shipComponents: false,
                shipRental: false,
                landing: false,
                habitation: false,
                fuel: {
                    hydrogen: false,
                    quantanium: false,
                },
                repair: false,
                rearm: false
            }
        };
        formik.setFieldValue('virs', virs);
    }

    return (
        <div className="helper helper-virs helper-virs__wrapper">
            <Typography color={updating ? '#fff' : '#aaa'} variant="h4" className="helper helper-virs helper-virs__heading">VIRS - VANGUARD INITIATIVE RECON SURVEY</Typography>
            <div className="helper helper-virs helper-virs__temp-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant="h5" className="helper helper-virs helper-virs__temp-heading">Surface Temp Range</Typography>
                <Tooltip title="Enter a Temperature and press 'Enter' to add it. (If the temperature was already recorded you cannot enter it again)">
                    <Autocomplete
                        value={formik.values.virs && formik.values.virs.temperatureMeasures ? formik.values.virs.temperatureMeasures : []}
                        multiple
                        className="helper helper-virs helper-virs__autocomplete"
                        options={[]}
                        noOptionsText={'Please enter a Temperature to add it.'}
                        freeSolo
                        renderTags={(value: string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        onChange={(e, value) => formik.setFieldValue('virs.temperatureMeasures', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Temperatures"
                                placeholder="Enter Temperature"
                                type="number"
                                multiline
                            />
                        )}
                        disabled={!updating}
                    />
                </Tooltip>
            </div>
            <div className="helper helper-virs helper-virs__atmo-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant="h5" className="helper helper-virs helper-virs__atmo-heading">Atmosphere</Typography>
                <FormControlLabel className="helper helper-virs helper-virs__atmo-checkbox" control={<Checkbox name="virs.breathable" value={formik.values.virs && formik.values.virs.breathable ? formik.values.virs.breathable : false} checked={formik.values.virs && formik.values.virs.breathable ? formik.values.virs.breathable : false} onChange={formik.handleChange} disabled={!updating} />} label="Breathable Atmo?" />
                <FormControl variant="filled" className="helper helper-virs helper-virs__atmo-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">ATM (Atmospheric Pressure)</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om5"
                        inputProps={{
                            'aria-label': 'pressure',
                        }}
                        type="number"
                        name='virs.externalPressure'
                        onChange={formik.handleChange}
                        value={formik.values.virs && formik.values.virs.externalPressure ? formik.values.virs.externalPressure : 0}
                        disabled={!updating}
                    />
                    <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">External Pressure</FormLabel>
                </FormControl>
                <Tooltip title="Enter the External Atmo Composition, like: 'N: 77.4%, O2: 21.1%, H20: 1.5%'">
                    <TextField 
                        label={"External Atmo Composition"}
                        name='virs.composition'
                        value={formik.values.virs && formik.values.virs.composition ? formik.values.virs.composition : ''}
                        onChange={formik.handleChange}
                        className='helper helper-virs helper-virs__atmo-textfield'
                        disabled={!updating}
                    />
                </Tooltip>
            </div>
            <div className="helper helper-virs helper-virs__basic-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant="h5" className="helper helper-virs helper-virs__basic-heading">Other Measurements</Typography>
                <FormControl variant="filled" className="helper helper-virs helper-virs__basic-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">m</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om5"
                        inputProps={{
                            'aria-label': 'distance',
                        }}
                        type="number"
                        name='virs.surfaceElevation'
                        onChange={formik.handleChange}
                        value={formik.values.virs && formik.values.virs.surfaceElevation ? formik.values.virs.surfaceElevation : 0}
                        disabled={!updating}
                    />
                    <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">Surface Elevation</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="helper helper-virs helper-virs__basic-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">rad</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om5"
                        inputProps={{
                            'aria-label': 'radiation',
                        }}
                        type="number"
                        name='virs.radiation'
                        onChange={formik.handleChange}
                        value={formik.values.virs && formik.values.virs.radiation ? formik.values.virs.radiation : 0}
                        disabled={!updating}
                    />
                    <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">Radiation</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="helper helper-virs helper-virs__basic-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment id={ updating ? "adornment-update" : "adornment-view"} position="end">N/kg</InputAdornment>}
                        aria-describedby="filled-weight-helper-text-om5"
                        inputProps={{
                            'aria-label': 'pressure',
                        }}
                        type="number"
                        name='virs.gravity'
                        onChange={formik.handleChange}
                        value={formik.values.virs && formik.values.virs.gravity ? formik.values.virs.gravity : 0}
                        disabled={!updating}
                    />
                    <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">Gravity</FormLabel>
                </FormControl>
            </div>
            <div className="helper helper-virs helper-virs__pads-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant="h5" className="helper helper-virs helper-virs__pads-heading">Pads</Typography>
                <FormControl variant="filled" className="helper helper-virs helper-virs__pads-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        aria-describedby="filled-weight-helper-text-om5"
                        type="number"
                        name='virs.pads.ship'
                        onChange={formik.handleChange}
                        value={formik.values.virs && formik.values.virs.pads ? formik.values.virs.pads.ship : 0}
                        disabled={!updating}
                    />
                    <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">Ship Pads</FormLabel>
                </FormControl>
                <FormControl variant="filled" className="helper helper-virs helper-virs__pads-input">
                    <FilledInput
                        id="filled-adornment-weight"
                        aria-describedby="filled-weight-helper-text-om5"
                        inputProps={{
                            'aria-label': 'pressure',
                        }}
                        type="number"
                        name='virs.pads.ground'
                        onChange={formik.handleChange}
                        value={formik.values.virs && formik.values.virs.pads ? formik.values.virs.pads.ground : 0}
                        disabled={!updating}
                    />
                    <FormLabel sx={updating ? {color: '#fff'} : {color: '#aaa'}} id="filled-weight-helper-text-om5">Ground Pads</FormLabel>
                </FormControl>
            </div>
            <div className="helper helper-virs helper-virs__consoles-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant="h5" className="helper helper-virs helper-virs__consoles-heading">Consoles & Services</Typography>
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.trading"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.trading : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.trading : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Trading Kiosk"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.mining"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.mining : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.mining : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Mining Kiosk"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.finePayment"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.finePayment : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.finePayment : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Fine Payment Kiosk"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.security"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.security : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.security : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Security Terminal"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.weaponSales.personal"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.weaponSales.personal : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.weaponSales.personal : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Personal Weapon Sales"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.weaponSales.ship"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.weaponSales.ship : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.weaponSales.ship : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Ship Weapon Sales"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.shipComponents"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.shipComponents : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.shipComponents : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Ship Components Sales"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.shipRental"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.shipRental : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.shipRental : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Ship Rental Service"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.landing"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.landing : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.landing : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Landing Services"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.habitation"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.habitation : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.habitation : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Habitations"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.fuel.hydrogen"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.fuel.hydrogen : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.fuel.hydrogen : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Hydrogen Fuel Services"
                />
                <FormControlLabel
                    className="helper helper-virs helper-virs__consoles-checkbox"
                    control={
                        <Checkbox
                            name="virs.consoles.fuel.quantanium"
                            value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.fuel.quantanium : false}
                            checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.fuel.quantanium : false}
                            onChange={formik.handleChange}
                            disabled={!updating}
                        />
                    }
                    label="Quantum Fuel Services"
                />
                <div className="helper helper-virs helper-virs__consoles-helper">
                    <FormControlLabel
                        className="helper helper-virs helper-virs__consoles-checkbox fixed"
                        control={
                            <Checkbox
                                name="virs.consoles.repair"
                                value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.repair : false}
                                checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.repair : false}
                                onChange={formik.handleChange}
                                disabled={!updating}
                            />
                        }
                        label="Repair Services"
                    />
                    <FormControlLabel
                        className="helper helper-virs helper-virs__consoles-checkbox fixed"
                        control={
                            <Checkbox
                                name="virs.consoles.rearm"
                                value={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.rearm : false}
                                checked={formik.values.virs && formik.values.virs.consoles ? formik.values.virs.consoles.rearm : false}
                                onChange={formik.handleChange}
                                disabled={!updating}
                            />
                        }
                        label="Re-Arm Services"
                    />
                </div>
            </div>
        </div>
    )
}