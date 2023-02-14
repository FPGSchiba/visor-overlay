import { Card, CardHeader, Collapse, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { IVISORSmall } from "../../../store/format/report.format";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublicIcon from '@mui/icons-material/Public';
import ScienceIcon from '@mui/icons-material/Science';
import ExploreIcon from '@mui/icons-material/Explore';
import data from '../../../shared/data.json';
import moment from "moment";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import { AppState } from "../../../store/format";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';


export function SmallReport(props: {report: IVISORSmall, handleOpenReport: (id: string, update: boolean) => void, handleApproveReport: (id: string) => void, handleDeleteReport: (id: string) => void}) {
    const {report, handleOpenReport, handleApproveReport, handleDeleteReport} = props;
    const [open, setOpen] = useState(false);
    const role = useSelector((state: AppState) => state.authState.currentUser.role);
    const codes = data.dropDown.visorCodes;

    return (
        <Card className="listAll listAll-sReport listAll-sReport__wrapper">
          <CardHeader
            title={
                <div className="listAll listAll-sReport listAll-sReport__header-wrapper">
                    <Typography variant="h4" className="listAll listAll-sReport listAll-sReport__heading">{report.reportName}</Typography>
                    <IconButton
                        className="listAll listAll-sReport listAll-sReport__header-info"
                        onClick={() => handleOpenReport(report.id, false)}
                        size="small"
                    >
                        <InfoIcon />
                    </IconButton>
                    <IconButton
                        className="listAll listAll-sReport listAll-sReport__header-edit"
                        onClick={() => handleOpenReport(report.id, true)}
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        className="listAll listAll-sReport listAll-sReport__header-approve"
                        onClick={() => handleApproveReport(report.id)}
                        id={role == 'Editor' || report.approved ? 'icon-disabled' : ''}
                        size="small"
                        disabled={role == 'Editor' || report.approved}
                    >
                        <DoneAllIcon />
                    </IconButton>
                    <IconButton
                        className="listAll listAll-sReport listAll-sReport__header-delete"
                        onClick={() => handleDeleteReport(report.id)}
                        id={role == 'Editor' || report.approved ? 'icon-disabled' : ''}
                        size="small"
                        disabled={role == 'Editor' || report.approved}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
            className="listAll listAll-sReport listAll-sReport__header"
            action={
              <IconButton
                className="listAll listAll-sReport listAll-sReport__header-icon"
                onClick={() => setOpen(!open)}
                aria-label="expand"
                size="small"
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            }
            subheader={
                <div className="listAll listAll-sReport listAll-sReport__icons">
                    { report.approved ? (
                        <Tooltip title={`This Report was Approved.`}>
                            <CheckCircleIcon  className="listAll listAll-sReport listAll-sReport__icon approved" />
                        </Tooltip>
                    ) : <div style={{display: 'inline-block'}}></div>}
                    { report.published ? (
                        <Tooltip title={`Publicly visible Report.`}>
                            <PublicIcon className="listAll listAll-sReport listAll-sReport__icon published" />
                        </Tooltip>
                    ) : <div style={{display: 'inline-block'}}></div>}
                    { report.reportMeta.followupDiscovery ? (
                        <Tooltip title={`Followup for Discovery requested: ${report.reportMeta.followupJustification}`}>
                            <ScienceIcon className="listAll listAll-sReport listAll-sReport__icon init" />
                        </Tooltip>
                    ): <div style={{display: 'inline-block'}}></div>}
                    { report.reportMeta.followupTrailblazers ? (
                        <Tooltip title={`Followup for Trailblazers requested: ${report.reportMeta.followupJustification}`}>
                            <ExploreIcon className="listAll listAll-sReport listAll-sReport__icon init" />
                        </Tooltip>
                    ): <div style={{display: 'inline-block'}} className="listAll listAll-sReport listAll-sReport__filler"></div>}
                </div>
            }
          >
          </CardHeader>
            <div className="listAll listAll-sReport listAll-sReport__content" >
                <Collapse in={open} timeout="auto" unmountOnExit className="listAll listAll-sReport listAll-sReport__collapse">
                    <Table>
                        <TableBody>
                            <Tooltip title='The RSI Handle of the last person to edit this report.'>
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography className="listAll listAll-sReport listAll-sReport__text" variant="h6">RSI Handle:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.reportMeta.rsiHandle}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            <Tooltip title={ report.reportMeta.visorCodeJustification ? `The Visor Code of the Report: ${report.reportMeta.visorCodeJustification}` : 'The VISOR Code for this report.'}>
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">VISOR Code:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{`[${report.reportMeta.visorCode}]`} {codes.filter((value) => value.code == report.reportMeta.visorCode)[0].name}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            <Tooltip title="The Date when this report was last edited.">
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">Date:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{moment.utc(report.reportMeta.date, false).format('MM/DD/YYYY HH:ss')}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            <Tooltip title="The Star Citizen Version this report was reported.">
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">Star Citizen Version:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.reportMeta.scVersion}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            <Tooltip title="The Type of POI this report is.">
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">POI Type:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.visorLocation.poiType}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            <Tooltip title="The System this report is located in.">
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">System:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.visorLocation.system}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            <Tooltip title="The Stellar Object this report is located in.">
                                <TableRow>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">Stellar Object:</Typography></TableCell>
                                    <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.visorLocation.stellarObject}</Typography></TableCell>
                                </TableRow>
                            </Tooltip>
                            { report.visorLocation.planetLevelObject ? (
                                <Tooltip title="The System this report is located in.">
                                    <TableRow>
                                        <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">Planet Level Object:</Typography></TableCell>
                                        <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.visorLocation.system}</Typography></TableCell>
                                    </TableRow>
                                </Tooltip>
                            ): null }
                            { report.keywords && report.keywords.length > 0 ? (
                                <Tooltip title="The Keywords for this report.">
                                    <TableRow>
                                        <TableCell className="listAll listAll-sReport listAll-sReport__cell"><Typography variant="h6" className="listAll listAll-sReport listAll-sReport__text">Keywords:</Typography></TableCell>
                                        <TableCell className="listAll listAll-sReport listAll-sReport__cell">
                                            <Typography variant="body1" className="listAll listAll-sReport listAll-sReport__text">{report.keywords.join(', ')}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </Tooltip>
                        ) : null}
                        </TableBody>
                    </Table>        
                </Collapse>
            </div>
        </Card>
    )
}