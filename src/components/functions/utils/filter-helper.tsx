import { Box, Button, Card, CardHeader, Checkbox, Collapse, FormControlLabel, IconButton, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import { ISearchFilter, IMetaFilter, ILocationFilter } from "../../../store/format/report.format";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useFormik } from "formik";
import data from "../../../shared/data.json";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className: string;
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

export interface IFormikValues {
    name: string,
    published: boolean,
    approved: boolean,
    keyword: string,
    followupDiscovery: boolean,
    followupTrailblazers: boolean,
    visorCode: number,
    scVersion: string,
    rsiHandle: string,
    system: string,
    stellarObject: string,
    planetLevelObject: string,
    poiType: string,
    jurisdiction: string
}

function getLocation(values: IFormikValues, initialValues: IFormikValues): ILocationFilter | undefined {
    let filter: ILocationFilter = {};
    if (values.system != initialValues.system ||
        values.stellarObject != initialValues.stellarObject ||
        values.planetLevelObject != initialValues.planetLevelObject ||
        values.poiType != initialValues.poiType ||
        values.jurisdiction != initialValues.jurisdiction) {
        if (values.system != initialValues.system) {
            filter.system = values.system;
        }
        if (values.stellarObject != initialValues.stellarObject) {
            filter.stellarObject = values.stellarObject;
        }
        if (values.planetLevelObject != initialValues.planetLevelObject) {
            filter.planetLevelObject = values.planetLevelObject;
        }
        if (values.poiType != initialValues.poiType) {
            filter.poiType = values.poiType;
        }
        if (values.jurisdiction != initialValues.jurisdiction) {
            filter.jurisdiction = values.jurisdiction;
        }

        return filter;
    } else {
        return undefined;
    }
}

function getMeta(values: IFormikValues, initialValues: IFormikValues): IMetaFilter | undefined {
    let filter: IMetaFilter = {};
    if (values.followupDiscovery != initialValues.followupDiscovery ||
        values.followupTrailblazers != initialValues.followupTrailblazers ||
        values.visorCode != initialValues.visorCode ||
        values.scVersion != initialValues.scVersion ||
        values.rsiHandle != initialValues.rsiHandle) {
        if (values.followupDiscovery != initialValues.followupDiscovery) {
            filter.followupDiscovery = `${values.followupDiscovery}`;
        }
        if (values.followupTrailblazers != initialValues.followupTrailblazers) {
            filter.followupTrailblazers = `${values.followupTrailblazers}`;
        }
        if (values.visorCode != initialValues.visorCode) {
            filter.visorCode = `${values.visorCode}`;
        }
        if (values.scVersion != initialValues.scVersion) {
            filter.scVersion = values.scVersion;
        }
        if (values.rsiHandle != initialValues.rsiHandle) {
            filter.rsiHandle = values.rsiHandle;
        }

        return filter;
    } else {
        return undefined;
    }
} 

export function FilterHelper(props: {filter: ISearchFilter | undefined, setFilter: (filter?: ISearchFilter) => void }) {
    const {filter, setFilter} = props;
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);

    const initialValues: IFormikValues = {
        name: '',
        published: false,
        approved: false,
        keyword: '',
        followupDiscovery: false,
        followupTrailblazers: false,
        visorCode: 0,
        scVersion: '',
        rsiHandle: '',
        system: '',
        stellarObject: '',
        planetLevelObject: '',
        poiType: '',
        jurisdiction: ''
    }

    const handleFilterChange = (values: IFormikValues) => {
        if (values != initialValues) {
            const newFilter: ISearchFilter = {}
            if (values.name != initialValues.name) {
                newFilter.name = values.name;
            }
            if (values.published != initialValues.published) {
                newFilter.published = `${values.published}`;
            }
            if (values.approved != initialValues.approved) {
                newFilter.approved = `${values.approved}`;
            }
            if (values.keyword != initialValues.keyword) {
                newFilter.keyword = values.keyword;
            }
            if (getLocation(values, initialValues)) {
                newFilter.location = getLocation(values, initialValues);
            }
            if (getMeta(values, initialValues)) {
                newFilter.meta = getMeta(values, initialValues);
            }
            setFilter(newFilter);
        } else {
            setFilter({});
        }
    }

    const formik = useFormik({initialValues, onSubmit: handleFilterChange})

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // TODO: Implement not Published & not Approved && not Followups

    const codes = data.dropDown.visorCodes;

    return (
        <Card className={`listAll listAll-filter listAll-filter__wrapper ${open}`}>
          <CardHeader
            title="Filter"
            className="listAll listAll-filter listAll-filter__header"
            action={
              <IconButton
                className="listAll listAll-filter listAll-filter__icon"
                onClick={() => setOpen(!open)}
                aria-label="expand"
                size="small"
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            }
          >
          </CardHeader>
            <div className="listAll listAll-filter listAll-filter__content" >
                <Collapse in={open} timeout="auto" unmountOnExit className="listAll listAll-filter listAll-filter__collapse">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="listAll listAll-filter listAll-filter__navigation">
                        <Tabs value={tabValue} onChange={handleChange} >
                            <Tab label="Basic Information" {...a11yProps(0)} />
                            <Tab label="Location" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        <TabPanel value={tabValue} index={0} className="listAll listAll-filter listAll-filter__tab basic">
                            <TextField 
                                label={"Report Name"}
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.errors.name}
                                className='listAll listAll-filter listAll-filter__textfield name'
                            />
                            <div className="listAll listAll-filter listAll-filter__checkboxes">
                                <FormControlLabel control={<Checkbox name="published" value={formik.values.published} onChange={formik.handleChange} />} label="Published" />
                                <FormControlLabel control={<Checkbox name="approved" value={formik.values.approved} onChange={formik.handleChange} />} label="Approved" />
                            </div>
                            <TextField 
                                label={"Keyword"}
                                name='keyword'
                                value={formik.values.keyword}
                                onChange={formik.handleChange}
                                error={formik.touched.keyword && Boolean(formik.errors.keyword)}
                                helperText={formik.errors.keyword}
                                className='listAll listAll-filter listAll-filter__textfield keyword'
                            />
                            <div className="listAll listAll-filter listAll-filter__checkboxes">
                                <FormControlLabel control={<Checkbox name="followupDiscovery" value={formik.values.followupDiscovery} onChange={formik.handleChange} />} label="Followup Discovery" />
                                <FormControlLabel control={<Checkbox name="followupTrailblazers" value={formik.values.followupTrailblazers} onChange={formik.handleChange} />} label="Followup Trailblazers" />
                            </div>
                            <Select
                                className="listAll listAll-filter listAll-filter__select visorCode"
                                value={formik.values.visorCode}
                                labelId="visor-code-label"
                                label="VISOR Code"
                                name="visorCode"
                                onChange={formik.handleChange}
                            >
                                <MenuItem key={0} value={0}>{'[0] No filter'}</MenuItem>
                                { codes.map((value) => {
                                    return (<MenuItem key={value.code} value={value.code}>{`[${value.code}] ${value.name}`}</MenuItem>)
                                })}
                            </Select>
                            <TextField 
                                label={"Star Citizen Version"}
                                name='scVersion'
                                value={formik.values.scVersion}
                                onChange={formik.handleChange}
                                error={formik.touched.scVersion && Boolean(formik.errors.scVersion)}
                                helperText={formik.errors.scVersion}
                                className='listAll listAll-filter listAll-filter__textfield scVersion'
                            />
                            <TextField 
                                label={"RSI Handle"}
                                name='rsiHandle'
                                value={formik.values.rsiHandle}
                                onChange={formik.handleChange}
                                error={formik.touched.rsiHandle && Boolean(formik.errors.rsiHandle)}
                                helperText={formik.errors.rsiHandle}
                                className='listAll listAll-filter listAll-filter__textfield rsiHandle'
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1} className="listAll listAll-filter listAll-filter__tab location">
                            <TextField 
                                label={"System"}
                                name='system'
                                value={formik.values.system}
                                onChange={formik.handleChange}
                                error={formik.touched.system && Boolean(formik.errors.system)}
                                helperText={formik.errors.system}
                                className='listAll listAll-filter listAll-filter__textfield system'
                            />
                            <TextField 
                                label={"Stellar Object"}
                                name='stellarObject'
                                value={formik.values.stellarObject}
                                onChange={formik.handleChange}
                                error={formik.touched.stellarObject && Boolean(formik.errors.stellarObject)}
                                helperText={formik.errors.stellarObject}
                                className='listAll listAll-filter listAll-filter__textfield stellarObject'
                            />
                            <TextField 
                                label={"Planet Level Object"}
                                name='planetLevelObject'
                                value={formik.values.planetLevelObject}
                                onChange={formik.handleChange}
                                error={formik.touched.planetLevelObject && Boolean(formik.errors.planetLevelObject)}
                                helperText={formik.errors.planetLevelObject}
                                className='listAll listAll-filter listAll-filter__textfield planetLevelObject'
                            />
                            <TextField 
                                label={"POI Type"}
                                name='poiType'
                                value={formik.values.poiType}
                                onChange={formik.handleChange}
                                error={formik.touched.poiType && Boolean(formik.errors.poiType)}
                                helperText={formik.errors.poiType}
                                className='listAll listAll-filter listAll-filter__textfield poiType'
                            />
                            <TextField 
                                label={"Jurisdiction"}
                                name='jurisdiction'
                                value={formik.values.jurisdiction}
                                onChange={formik.handleChange}
                                error={formik.touched.jurisdiction && Boolean(formik.errors.jurisdiction)}
                                helperText={formik.errors.jurisdiction}
                                className='listAll listAll-filter listAll-filter__textfield jurisdiction'
                            />
                        </TabPanel>
                        { tabValue != 0 ? (
                            <Button variant="contained" onClick={() => setTabValue((value) => {return value - 1;})} className="listAll listAll-filter listAll-filter__button">Back</Button>
                        ): <Button variant="contained" onClick={() => setTabValue((value) => {return value + 1;})} className="listAll listAll-filter listAll-filter__button">Next</Button>}
                        <Button type="submit" variant="contained" className="listAll listAll-filter listAll-filter__search">Apply</Button>
                    </form>
                </Collapse>
            </div>
        </Card>
    )
}