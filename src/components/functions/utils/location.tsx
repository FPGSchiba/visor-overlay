import React from "react";
import { Checkbox, FormControlLabel, TextField, Tooltip, Typography } from "@mui/material";
import data from '../../../shared/data.json';

export function Location(props: {formik: any, updating: boolean}) {
    const {formik, updating} = props;

    const { classification, surroundings, trade, services, hostiles, defenses, occupants, lethalForce, remainingOccupants, other } = data.tooltips;

    return (
        <div className="helper helper-loc helper-loc__wrapper">
            <div className="helper helper-loc helper-loc__basic-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant='h4' className="helper helper-loc helper-loc__heading" >Basic</Typography>
                <TextField 
                    label={"System"}
                    name='visorLocation.system'
                    value={formik.values.visorLocation.system}
                    onChange={formik.handleChange}
                    className='helper helper-loc helper-loc__textfield'
                    disabled={!updating}
                />
                <TextField 
                    label={"Stellar Object"}
                    name='visorLocation.planetLevelObject'
                    value={formik.values.visorLocation.stellarObject}
                    onChange={formik.handleChange}
                    className='helper helper-loc helper-loc__textfield right'
                    disabled={!updating}
                />
                <TextField 
                    label={"Planet Level Object"}
                    name='visorLocation.planetLevelObject'
                    value={formik.values.visorLocation.planetLevelObject}
                    onChange={formik.handleChange}
                    className='helper helper-loc helper-loc__textfield'
                    disabled={!updating}
                />
                <TextField 
                    label={"POI Type"}
                    name='visorLocation.poiType'
                    value={formik.values.visorLocation.poiType}
                    onChange={formik.handleChange}
                    className='helper helper-loc helper-loc__textfield right'
                    disabled={!updating}
                />
                <TextField 
                    label={"Jurisdiction"}
                    name='visorLocation.jurisdiction'
                    value={formik.values.visorLocation.jurisdiction}
                    onChange={formik.handleChange}
                    className='helper helper-loc helper-loc__textfield'
                    disabled={!updating}
                />
            </div>
            <div className="helper helper-loc helper-loc__detail-wrapper">
                <Typography color={updating ? '#fff' : '#aaa'} variant='h4' className="helper helper-loc helper-loc__heading" >Details</Typography>
                <Tooltip title={classification} arrow placement="right">
                    <TextField 
                        label={"Location Classification"}
                        multiline
                        name='locationDetails.classification'
                        value={formik.values.locationDetails.classification}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={surroundings} arrow placement="right">
                    <TextField 
                        label={"Surroundings"}
                        multiline
                        name='locationDetails.surroundings'
                        value={formik.values.locationDetails.surroundings}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield right'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={trade} arrow placement="right">
                    <TextField 
                        label={"Trade Details"}
                        multiline
                        name='locationDetails.trade'
                        value={formik.values.locationDetails.trade}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={services} arrow placement="right">
                    <TextField 
                        label={"Services"}
                        multiline
                        name='locationDetails.services'
                        value={formik.values.locationDetails.services}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield right'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={hostiles} arrow placement="right">
                    <TextField 
                        label={"Hostiles"}
                        multiline
                        name='locationDetails.hostiles'
                        value={formik.values.locationDetails.hostiles}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={defenses} arrow placement="right">
                    <TextField 
                        label={"Defenses"}
                        multiline
                        name='locationDetails.defenses'
                        value={formik.values.locationDetails.defenses}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield right'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={occupants} arrow placement="right">
                    <TextField 
                        label={"Occupants"}
                        multiline
                        name='locationDetails.occupants'
                        value={formik.values.locationDetails.occupants}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={lethalForce} arrow placement="right">
                    <TextField 
                        label={"Lethal Force"}
                        multiline
                        name='locationDetails.lethalForce'
                        value={formik.values.locationDetails.lethalForce}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield right'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={remainingOccupants} arrow placement="right">
                    <TextField 
                        label={"Remaining Occupants"}
                        multiline
                        name='locationDetails.remainingOccupants'
                        value={formik.values.locationDetails.remainingOccupants}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield'
                        disabled={!updating}
                    />
                </Tooltip>
                <Tooltip title={other} arrow placement="right">
                    <TextField 
                        label={"Other zone"}
                        multiline
                        name='locationDetails.zones.other'
                        value={formik.values.locationDetails.zones.other}
                        onChange={formik.handleChange}
                        className='helper helper-loc helper-loc__textfield right'
                        disabled={!updating}
                    />
                </Tooltip>
                <div className="helper helper-loc helper-loc__zones-wrapper">
                    <FormControlLabel control={<Checkbox disabled={!updating} name="locationDetails.zones.noFly" value={formik.values.locationDetails.zones.noFly} onChange={formik.handleChange} />} label="No Fly Zone?" />
                    <FormControlLabel control={<Checkbox disabled={!updating} name="locationDetails.zones.armistice" value={formik.values.locationDetails.zones.armistice} onChange={formik.handleChange} />} label="Armistice Zone?" />
                    <FormControlLabel control={<Checkbox disabled={!updating} name="locationDetails.zones.restricted" value={formik.values.locationDetails.zones.restricted} onChange={formik.handleChange} />} label="Restricted Zone?" />
                </div>
            </div>
        </div>
    )
}