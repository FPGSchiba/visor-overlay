import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IVISORReport } from "../store/format/report.format";
import { AppState } from "../store/format";
import { useFormik } from "formik";
import { Box, Button, IconButton, Tab, Tabs, TextField } from "@mui/material";
import { setUpdatingReport } from "../store/actions/reports";
import CloseIcon from '@mui/icons-material/Close';
import { BasicInfo } from "./functions/utils/basic-info";
import { Location } from './functions/utils/location';
import { Navigation } from "./functions/utils/navigation";
import { VIRS } from "./functions/utils/virs";
import { Screenshots } from "./functions/utils/screenshot-helper";

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

export function ViewHelper() {
    const currentReport = useSelector((state: AppState) => state.reportState.updateState.report);
    const updating = useSelector((state: AppState) => state.reportState.updateState.updating);

    const initialValues: IVISORReport = currentReport;
    const handleSubmit = (values: IVISORReport) => {
        console.log(values);
    } 

    const formik = useFormik({initialValues, onSubmit: handleSubmit});
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setUpdatingReport(false, false, undefined));
    }


    // Header: Switch to view / updating mode & Close View Helper & Tabs Done
    // Tab: Basic Info (reportName, approved, published, reportMeta, keywords) Done
    // Tab: Location (visorLocation, locationDetails) Done
    // Tab: Navigation (navigation, fuelConsumptions) Done
    // Tab: VIRS (virs)
    // Tab: Screenshots (own api)
    // Footer: Back & Create & Next Buttons (Done)
    return (
        <div className="helper helper-wrapper">
            <div className="helper helper-header helper-header__wrapper">
                <IconButton
                    className="helper helper-header helper-header_button"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="helper helper-header helper-header__tab-wrapper">
                    <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                        <Tab label="Basic Information" />
                        <Tab label="Location" />
                        <Tab label="Navigation" />
                        <Tab label="VIRS" />
                        <Tab label="Screenshots" />
                    </Tabs>
                </Box>
            </div>
            <form className="helper helper-form helper-form__form" onSubmit={formik.handleSubmit}>
                <div className="helper helper-form helper-form__wrapper">
                    <TabPanel value={value} index={0} className="helper helper-form helper-form__tab basic">
                        <BasicInfo formik={formik} updating={updating} />
                    </TabPanel>
                    <TabPanel value={value} index={1} className="helper helper-form helper-form__tab location">
                        <Location formik={formik} updating={updating} />
                    </TabPanel>
                    <TabPanel value={value} index={2} className="helper helper-form helper-form__tab navigation">
                        <Navigation formik={formik} updating={updating} />
                    </TabPanel>
                    <TabPanel value={value} index={3} className="helper helper-form helper-form__tab virs">
                        <VIRS formik={formik} updating={updating} />
                    </TabPanel>
                    <TabPanel value={value} index={4} className="helper helper-form helper-form__tab screenshots">
                        <Screenshots formik={formik} updating={updating} />
                    </TabPanel>
                </div>
                <div className="helper helper-footer helper-footer__wrapper">
                    <Button variant="contained" disabled={value == 0} onClick={() => setValue((value) => { return value - 1; })} className="helper helper-footer helper-footer__button-back">Back</Button>
                    <Button variant="contained" type="submit" disabled={!updating} className="helper helper-footer helper-footer__button-submit">Update</Button>
                    <Button variant="contained" disabled={value >= 4} onClick={() => setValue((value) => { return value + 1; })} className="helper helper-footer helper-footer__button-next">Next</Button>
                </div>
            </form>
        </div>
    )
}