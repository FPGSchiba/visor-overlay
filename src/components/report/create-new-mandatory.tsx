import { Alert, Backdrop, Box, Button, Checkbox, CircularProgress, FormControlLabel, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/format";
import * as Yup from 'yup';
import data from '../../shared/data.json';
import SystemSelect, { ObjectSelect, PlanetLevelOverwrite, PLOSelect, SystemOptionType } from "../functions/utils/system-select";
import { POITypeSelect } from "../functions/utils/location-select";
import { VISORCodeSelect } from "../functions/utils/visor-code-select";
import { DatePicker, DateTimePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { FollowUpHelper } from "../functions/utils/followups-helper";
import { OMHelper } from "../functions/utils/om-helper";
import { ZonesHelper } from "../functions/utils/zones-helper";
import { IVISORInput } from "../../store/format/report.format";
import { createReport } from "../../store/actions/reports";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={className}
        {...other}
      >
        {value === index && (
          <>{children}</>
        )}
      </div>
    );
}
  
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function CreateNewMandatory() {
    const [system, setSystem] = useState<SystemOptionType | undefined>(undefined);
    const [systemId, setSystemId] = useState('');
    const [object, setObject] = useState<SystemOptionType | undefined>(undefined);
    const [plo, setPLO] = useState<SystemOptionType | undefined>(undefined);
    const [poiType, setPoiType] = useState<SystemOptionType | undefined>(undefined);
    const [hasPlanetLevelObject, setHasPlanetLevelObject] = useState(false);
    const handle = useSelector((state: AppState) => state.authState.currentUser.handle);
    const [value, setValue] = React.useState(0);
    const { classification, surroundings, trade, services, hostiles, defenses, occupants, lethalForce, remainingOccupants, other } = data.tooltips;
    const dispatch = useDispatch();
    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);
    const [loading, setLoading] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const validationSchema = Yup.object().shape({
        reportName: Yup.string().required('ThiYou need to give your Report a unique Name!'),
        published: Yup.bool(),
        jurisdiction: Yup.string(),
        rsiHandle: Yup.string(),
        visorCode: Yup.number().required('You need to select a VISOR Code!'),
        visorCodeJustification: Yup.string().when('visorCode', {
            is: (visorCode: number) => visorCode === 5 || visorCode === 6,
            then: Yup.string().required('You need to enter a reason, for Visor Code: 5 & 6!'),
            otherwise: Yup.string()
        }),
        scVersion: Yup.string().required('Specify a Star Citizen Version.').matches(/^(\d{1,2}|\d{1,2}\.\d{1,3}|\d{1,2}\.\d{1,3}\.\d{1,3})$/, `Please enter a valid Star Citizen Version, like: ${version}`),
        date: Yup.number(),
        followUpTrailblazers: Yup.bool(),
        followUpDiscovery: Yup.bool(),
        followUpJustification: Yup.string().when('followUpTrailblazers', {
            is: (followUpTrailblazers: boolean) => followUpTrailblazers == true,
            then: Yup.string().required('You need to enter a reason, for a Trailblazers followup!'),
            otherwise: Yup.string()
        }).when('followUpDiscovery', {
            is: (followUpDiscovery: boolean) => followUpDiscovery == true,
            then: Yup.string().required('You need to enter a reason, for a Discovery followup!'),
            otherwise: Yup.string()
        }),
        om1: Yup.number().required('Please enter all Orbital Markers!'),
        om2: Yup.number().required('Please enter all Orbital Markers!'),
        om3: Yup.number().required('Please enter all Orbital Markers!'),
        om4: Yup.number().required('Please enter all Orbital Markers!'),
        om5: Yup.number().required('Please enter all Orbital Markers!'),
        om6: Yup.number().required('Please enter all Orbital Markers!'),
        classification: Yup.string().required('Enter a description of the location you have surveyed!'),
        surroundings: Yup.string().required('Enter a description of the surroundings you have surveyed!'),
        trade:  Yup.string(),
        services:  Yup.string(),
        hostiles:  Yup.string(),
        defenses:  Yup.string(),
        occupants:  Yup.string(),
        lethalForce:  Yup.string(),
        remainingOccupants: Yup.string(),
        noFly: Yup.bool(),
        armistice: Yup.bool(),
        restricted: Yup.bool(),
        other:  Yup.string()
    });

    const initialValues = {
        reportName: '',
        published: false,
        jurisdiction: '',
        rsiHandle: handle,
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
        classification: '',
        surroundings: '',
        trade: '',
        services: '',
        hostiles: '',
        defenses: '',
        occupants: '',
        lethalForce: '',
        remainingOccupants: '',
        noFly: false,
        armistice: false,
        restricted: false,
        other: ''
    };

    const handleCreation = (values: {
        published: boolean; reportName: string; jurisdiction: string; rsiHandle: string; visorCode: number; visorCodeJustification: string; scVersion: string; date: number; followUpTrailblazers: boolean; followUpDiscovery: boolean; followUpJustification: string; om1: number; om2: number; om3: number; om4: number; om5: number; om6: number; classification: string; surroundings: string; trade: string; services: string; hostiles: string; defenses: string; occupants: string; lethalForce: string; remainingOccupants: string; noFly: boolean; armistice: boolean; restricted: boolean; other: string; resetForm: () => void
    }, formikHelpers: FormikHelpers<{
            published: boolean; reportName: string; jurisdiction: string; rsiHandle: string; visorCode: number; visorCodeJustification: string; scVersion: string; date: number; followUpTrailblazers: boolean; followUpDiscovery: boolean; followUpJustification: string; om1: number; om2: number; om3: number; om4: number; om5: number; om6: number; classification: string; surroundings: string; trade: string; services: string; hostiles: string; defenses: string; occupants: string; lethalForce: string; remainingOccupants: string; noFly: boolean; armistice: boolean; restricted: boolean; other: string; 
    }>) => {
        setLoading(true);
        const { reportName, published, jurisdiction, rsiHandle, visorCode, visorCodeJustification, scVersion, date, followUpTrailblazers: followupTrailblazers, followUpDiscovery: followupDiscovery, followUpJustification: followupJustification, om1, om2, om3, om4, om5, om6, classification, surroundings, trade, services, hostiles, defenses, occupants, lethalForce, remainingOccupants, noFly, armistice, restricted, other, resetForm } = values;

        if (!(system && system.label)) {
            setError('Please select a system, where is your Report?');
            setLoading(false);
            setErrorOpen(true);
        }
        if (!(object && object.label)) {
            setError('Please select a Stellar Object, on which Planet / Moon is your POI?');
            setLoading(false);
            setErrorOpen(true);
        }
        if (!(poiType && poiType.label)) {
            setError('Please select a POI Type, what is your Report about?');
            setLoading(false);
            setErrorOpen(true);
        }

        const report: IVISORInput = {
            reportName,
            published: `${published}`,
            visorLocation: {
                system: system.label,
                stellarObject: object.label,
                planetLevelObject: typeof(plo) == 'object' ? plo.label : undefined,
                poiType: poiType.label,
                jurisdiction
            },
            reportMeta: {
                rsiHandle,
                visorCode,
                visorCodeJustification,
                scVersion,
                date,
                followupTrailblazers: followupTrailblazers,
                followupDiscovery,
                followupJustification
            },
            locationDetails: {
                classification,
                surroundings,
                trade,
                services,
                hostiles,
                defenses,
                occupants,
                lethalForce,
                remainingOccupants,
                zones: {
                    noFly,
                    armistice,
                    restricted,
                    other
                }
            },
            navigation: {
                om1,
                om2,
                om3,
                om4,
                om5,
                om6
            }
        }

        dispatch(createReport(orgToken, userToken, report, (err: any) => {
            if (!err) {
                setLoading(false);
                setSuccess(true);
                navigate('/list-all');
            } else {
                setError(err.message);
                setLoading(false);
                setErrorOpen(true);
            }
            resetForm();
        }))
    }
    
    const formik = useFormik({ initialValues, onSubmit: handleCreation, validationSchema });
    return (
        <div className="mReport" style={{height: '100%'}}>
            <form className="mReport mReport-form" onSubmit={formik.handleSubmit}>
                <div className="mReport mReport-form mReport-form__wrapper">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="mReport mReport-form mReport-form__navigation">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Basic Information" {...a11yProps(0)} />
                            <Tab label="Navigation" {...a11yProps(1)} />
                            <Tab label="Surroundings" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} className="mReport mReport-form mReport-form__tab basic">
                        <TextField 
                            label={"Report Name"}
                            name='reportName'
                            value={formik.values.reportName}
                            onChange={formik.handleChange}
                            error={formik.touched.reportName && Boolean(formik.errors.reportName)}
                            helperText={formik.errors.reportName}
                            className='mReport mReport-form mReport-form__textfield name'
                        />
                        <FormControlLabel className="mReport mReport-form mReport-form__published" control={<Checkbox name="published" value={formik.values.published} onChange={formik.handleChange} />} label="Public Report?" />
                        <TextField 
                                label={"RSI Handle"}
                                name='rsiHandle'
                                value={formik.values.rsiHandle}
                                onChange={formik.handleChange}
                                error={formik.touched.rsiHandle && Boolean(formik.errors.rsiHandle)}
                                helperText={formik.errors.rsiHandle}
                                className='mReport mReport-form mReport-form__textfield'
                                disabled={handle != ''}
                        />
                        <VISORCodeSelect formik={formik}/>
                        <TextField 
                                label={"Star Citizen Version"}
                                name='scVersion'
                                value={formik.values.scVersion}
                                onChange={formik.handleChange}
                                error={formik.touched.scVersion && Boolean(formik.errors.scVersion)}
                                helperText={formik.errors.scVersion}
                                className='mReport mReport-form mReport-form__textfield version'
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
                                className="mReport mReport-form mReport-form__date"
                        />
                        <FollowUpHelper formik={formik} />
                    </TabPanel>
                    <TabPanel value={value} index={1} className="mReport mReport-form mReport-form__tab nav-info">
                        <SystemSelect disabled={false} className="mReport mReport-form mReport-form__systems" value={system} setValue={setSystem} setId={setSystemId} />
                        <PlanetLevelOverwrite disabled={false} hasPlanetLevelObject={hasPlanetLevelObject} setHasPlanetLevelObject={setHasPlanetLevelObject} />
                        <ObjectSelect disabled={false} className="mReport mReport-form mReport-form__objects" value={object} setValue={setObject} selectedSystem={system} selectedId={systemId} setPlanetLevelObject={setHasPlanetLevelObject} />
                        { hasPlanetLevelObject ? (
                            <PLOSelect disabled={false} className="mReport mReport-form mReport-form__plo" value={plo} setValue={setPLO} selectedId={systemId} selectedStellarObject={object} />
                        ) : <div className="mReport mReport-form mReport-form__filler"></div>}
                        <POITypeSelect disabled={false} className="mReport mReport-form mReport-form__poi" value={poiType} setValue={setPoiType} />
                        <TextField 
                            label={"Jurisdiction"}
                            name='jurisdiction'
                            value={formik.values.jurisdiction}
                            onChange={formik.handleChange}
                            error={formik.touched.jurisdiction && Boolean(formik.errors.jurisdiction)}
                            helperText={formik.errors.jurisdiction}
                            className='mReport mReport-form mReport-form__textfield right-hand-text'
                        />
                        <OMHelper formik={formik} />
                    </TabPanel>
                    <TabPanel value={value} index={2} className="mReport mReport-form mReport-form__tab surroundings">
                        <Tooltip title={classification} arrow placement="right">
                            <TextField 
                                label={"Location Classification"}
                                name='classification'
                                value={formik.values.classification}
                                onChange={formik.handleChange}
                                error={formik.touched.classification && Boolean(formik.errors.classification)}
                                helperText={formik.errors.classification}
                                className='mReport mReport-form mReport-form__textfield'
                            />
                        </Tooltip>
                        <Tooltip title={surroundings} arrow placement="right">
                            <TextField 
                                label={"Surroundings"}
                                name='surroundings'
                                value={formik.values.surroundings}
                                onChange={formik.handleChange}
                                error={formik.touched.surroundings && Boolean(formik.errors.surroundings)}
                                helperText={formik.errors.surroundings}
                                className='mReport mReport-form mReport-form__textfield right-hand-text'
                            />
                        </Tooltip>
                        <Tooltip title={trade} arrow placement="right">
                            <TextField 
                                label={"Trade Details"}
                                name='trade'
                                value={formik.values.trade}
                                onChange={formik.handleChange}
                                error={formik.touched.trade && Boolean(formik.errors.trade)}
                                helperText={formik.errors.trade}
                                className='mReport mReport-form mReport-form__textfield'
                            />
                        </Tooltip>
                        <Tooltip title={services} arrow placement="right">
                            <TextField 
                                label={"Services"}
                                name='services'
                                value={formik.values.services}
                                onChange={formik.handleChange}
                                error={formik.touched.services && Boolean(formik.errors.services)}
                                helperText={formik.errors.services}
                                className='mReport mReport-form mReport-form__textfield right-hand-text'
                            />
                        </Tooltip>
                        <Tooltip title={hostiles} arrow placement="right">
                            <TextField 
                                label={"Hostiles"}
                                name='hostiles'
                                value={formik.values.hostiles}
                                onChange={formik.handleChange}
                                error={formik.touched.hostiles && Boolean(formik.errors.hostiles)}
                                helperText={formik.errors.hostiles}
                                className='mReport mReport-form mReport-form__textfield'
                            />
                        </Tooltip>
                        <Tooltip title={defenses} arrow placement="right">
                            <TextField 
                                label={"Defenses"}
                                name='defenses'
                                value={formik.values.defenses}
                                onChange={formik.handleChange}
                                error={formik.touched.defenses && Boolean(formik.errors.defenses)}
                                helperText={formik.errors.defenses}
                                className='mReport mReport-form mReport-form__textfield right-hand-text'
                            />
                        </Tooltip>
                        <Tooltip title={occupants} arrow placement="right">
                            <TextField 
                                label={"Occupants"}
                                name='occupants'
                                value={formik.values.occupants}
                                onChange={formik.handleChange}
                                error={formik.touched.occupants && Boolean(formik.errors.occupants)}
                                helperText={formik.errors.occupants}
                                className='mReport mReport-form mReport-form__textfield'
                            />
                        </Tooltip>
                        <Tooltip title={lethalForce} arrow placement="right">
                            <TextField 
                                label={"Lethal Force"}
                                name='lethalForce'
                                value={formik.values.lethalForce}
                                onChange={formik.handleChange}
                                error={formik.touched.lethalForce && Boolean(formik.errors.lethalForce)}
                                helperText={formik.errors.lethalForce}
                                className='mReport mReport-form mReport-form__textfield right-hand-text'
                            />
                        </Tooltip>
                        <Tooltip title={remainingOccupants} arrow placement="right">
                            <TextField 
                                label={"Remaining Occupants"}
                                name='remainingOccupants'
                                value={formik.values.remainingOccupants}
                                onChange={formik.handleChange}
                                error={formik.touched.remainingOccupants && Boolean(formik.errors.remainingOccupants)}
                                helperText={formik.errors.remainingOccupants}
                                className='mReport mReport-form mReport-form__textfield'
                            />
                        </Tooltip>
                        <ZonesHelper formik={formik} other={other} />
                    </TabPanel>
                </div>
                <div className="mReport mReport-form mReport-form__submit-wrapper">
                    { value != 0 ? (
                        <Button variant="contained" onClick={() => setValue((value) => { return value - 1; })} className="mReport mReport-form mReport-form__submit-button">Back</Button>
                    ) : null }
                    { value >= 2 ? (
                        <Button variant="contained" type="submit" className="mReport mReport-form mReport-form__submit-button">Create</Button>
                    ) : <Button variant="contained" onClick={() => setValue((value) => { return value + 1; })} className="mReport mReport-form mReport-form__submit-button">Next</Button>}
                </div>
                <Backdrop
                    open={loading}
                    className='backdrop backdrop-create backdrop-create__loading'
                >
                    <CircularProgress />
                </Backdrop>
                <Backdrop
                    open={errorOpen}
                    className='backdrop backdrop-create backdrop-create__error'
                    onClick={() => setErrorOpen(false)}
                >
                    <Alert severity="error">{error}</Alert>
                </Backdrop>
                <Backdrop
                    open={success}
                    onClick={() => setSuccess(false)}
                >
                    <Alert severity="info">Created Report!</Alert>
                </Backdrop>
            </form>
        </div>
    )
}