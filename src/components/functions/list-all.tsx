import { Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveReport, deleteReport, listReports, openReport, setUpdatingReport } from "../../store/actions/reports";
import { AppState } from "../../store/format";
import { ISearchFilter, IVISORSmall } from "../../store/format/report.format";
import { FilterHelper } from "./utils/filter-helper";
import { NavigationHeader } from "./utils/navigation-header";
import { SmallReport } from "./utils/small-report";

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
export function ListAll() {
    const length = 6;
    const [filter, setFilter] = useState<ISearchFilter | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [to, setTo] = useState(length);
    const [from, setFrom] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<IVISORSmall[]>([])
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);
    const [approveDialog, setApproveDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [approveReason, setApproveReason] = useState('');
    const [deleteReason, setDeleteReason] = useState('');
    const [selectedId, setSelectedId] = useState('');
    
    const dispatch = useDispatch();
    const reportOpen = useSelector((state: AppState) => state.reportState.updateState.open);
    const handle = useSelector((state: AppState) => state.authState.currentUser.handle);
    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setTo(newPage * length);
        setFrom((newPage * length) - length);
        setPage(newPage);
    }

    const handleOpenReport = (id: string, update: boolean) => {
        if (!reportOpen) {
            dispatch(openReport(orgToken, userToken, update, id, (err) => {
                if (err) {
                    setError(err.message);
                    setHasError(true);
                }
            }))
        } else {
            dispatch(setUpdatingReport(false, false, undefined));
            dispatch(openReport(orgToken, userToken, update, id, (err) => {
                if (err) {
                    setError(err.message);
                    setHasError(true);
                }
            }))
        }
    }

    const handleApproveReport = (id: string) => {
        setSelectedId(id);
        setApproveDialog(true);
    }

    const dialogApproveReport = () => {
        if (approveReason != '') {
            setLoading(true);
            setApproveDialog(false);
            dispatch(approveReport(orgToken, userToken, selectedId, handle, approveReason, (err) => {
                if (err) {
                    setError(err.message);
                    setHasError(true);
                    setSelectedId('');
                    handleSearch(false);
                } else {
                    setLoading(false);
                    setSelectedId('');
                    handleSearch(false);
                }
            }))
        }
    }

    const handleDeleteReport = (id: string) => {
        setSelectedId(id);
        setDeleteDialog(true);
    }

    const dialogDeleteReport = () => {
        if (deleteReason != '') {
            setLoading(true);
            setDeleteDialog(false);
            dispatch(deleteReport(orgToken, userToken, selectedId, deleteReason, (err) => {
                if (err) {
                    setError(err.message);
                    setSelectedId('');
                    setHasError(true);
                    handleSearch(false);
                } else {
                    setLoading(false);
                    setSelectedId('');
                    handleSearch(false);
                }
            }))
        }
    }

    const checkPageAfterSearch = (total: number) => {
        const pageCount = Math.ceil(total / length) == 0 ? 1 : Math.ceil(total / length);
        if (pageCount < page) {
            handlePageChange(null, 1);
        }
    }

    useEffect(() => {
        handleSearch(true);
    }, [filter, to, from, length, userToken, orgToken]);

    const handleSearch = (fromEffect?: boolean) => {
        setLoading(true);
        if (typeof(filter) == 'undefined') {
            const newFilter: ISearchFilter = {
                to,
                from,
                length
            }
            dispatch(listReports(orgToken, userToken, newFilter, (err, list, total) => {
                if(!err && list && total) {
                    setTotal(total);
                    setReports(list);
                    checkPageAfterSearch(total);
                    setLoading(false);
                } else {
                    setError(err.message);
                    setTotal(0);
                    setReports([]);
                    setHasError(true);
                    setLoading(false);
                }
            }))
        } else {
            const newFilter: ISearchFilter = {
                ...filter,
                to,
                from,
                length
            }
            dispatch(listReports(orgToken, userToken, newFilter, (err, list, total) => {
                if(!err) {
                    setTotal(total);
                    setReports(list);
                    checkPageAfterSearch(total);
                    setLoading(false);
                } else {
                    setError(err.message);
                    setTotal(0);
                    setReports([]);
                    setHasError(true);
                    setLoading(false);
                }
            }))
        }
        if (!fromEffect) {
            setPage(1);
        }
    }

    const getPageCount = () => {
        if (Math.ceil(total / length) == 0) {
            return 1;
        } else {
            return Math.ceil(total / length);
        }
    }

    return (
        <div className="listAll listAll-wrapper">
            <NavigationHeader header="List All" />
            <FilterHelper filter={filter} setFilter={setFilter} />
            <div className="listAll listAll-content listAll-content__wrapper">
                { reports.length > 0 ? Array.from({length: getPageCount()}, (x, i) => i + 1).map((index) => (
                    <TabPanel key={index} value={page} index={index} className="listAll listAll-content listAll-content__tab">
                        {reports.map((report, reportIndex) => (
                            <SmallReport key={reportIndex} report={report} handleOpenReport={handleOpenReport} handleApproveReport={handleApproveReport} handleDeleteReport={handleDeleteReport} />
                        ))}
                    </TabPanel>
                )) : null}
            </div>
            <div className="listAll listAll-pagination listAll-pagination__wrapper">
                <Pagination siblingCount={0} count={getPageCount()} page={page} onChange={handlePageChange} showFirstButton showLastButton className="listAll listAll-pagination listAll-pagination__pagination" />
                <Typography variant="body1" className="listAll listAll-pagination listAll-pagination__total">Total: {total}</Typography>
                <Button variant="contained" onClick={() => handleSearch(false)} className="listAll listAll-pagination listAll-pagination__search">Refresh</Button>
            </div>
            <Backdrop
                    open={loading}
                >
                    <CircularProgress />
            </Backdrop>
            <Dialog open={hasError} onClose={() => setHasError(false)}>
                <div id={'error-dialog'}>
                    <DialogTitle>There was a Error</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">{error}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={() => setHasError(false)}>Close</Button>
                    </DialogActions>
                </div>
            </Dialog>
            <Dialog open={approveDialog} onClose={() => {setApproveDialog(false); setSelectedId('')}}>
                <form>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Are you sure you want to Approve this Report?</Typography>
                        <Typography variant="body2">This cannot be undone and you will not be able to edit or delete this report ever again. Please think twice about this.</Typography>
                        <TextField 
                            label={"Approve Reason"}
                            required
                            value={approveReason}
                            onChange={(event) => setApproveReason(event.target.value)}
                            className='listAll listAll-approve listAll-approve__textfield'
                        />
                        <TextField 
                            label={"Report ID"}
                            value={selectedId}
                            className='listAll listAll-approve listAll-approve__textfield'
                            disabled={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setApproveDialog(false); setSelectedId('')}}>Cancel</Button>
                        <Button onClick={dialogApproveReport}>Approve</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => {setDeleteDialog(false); setSelectedId('')}}>
                <form>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Are you sure you want to Delete this Report?</Typography>
                        <TextField 
                            label={"Delete Reason"}
                            required
                            value={deleteReason}
                            onChange={(event) => setDeleteReason(event.target.value)}
                            className='listAll listAll-delete listAll-delete__textfield'
                        />
                        <TextField 
                            label={"Report ID"}
                            value={selectedId}
                            className='listAll listAll-delete listAll-delete__textfield'
                            disabled={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setDeleteDialog(false); setSelectedId('')}}>Cancel</Button>
                        <Button onClick={dialogDeleteReport}>Delete</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}