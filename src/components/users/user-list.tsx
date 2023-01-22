import { Button, CircularProgress, IconButton, List, ListItem, ListItemText, Popover, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState, IUser } from "../../store/format";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { clipboard } from "electron";

export function UserList(props: {setEditUserOpen: (open: boolean) => void, setEditUserHandle: (handle: string) => void, fetchUserData: () => void, users: IUser[], setDeleteUserHandle: (handle: string) => void, setDeleteUserOpen: (open: boolean) => void}) {
    const { setEditUserOpen, setEditUserHandle, fetchUserData, users, setDeleteUserOpen, setDeleteUserHandle } = props;
    const [loading, setLoading] = useState(true);
    const currentHandle = useSelector((state: AppState) => state.authState.currentUser.handle);
    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);
    const [infoOpen, setInfoOpen] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        fetchUserData();
        setLoading(false);
    }

    const handleUserEdit = (handle: string) => {
        setEditUserHandle(handle);
        setEditUserOpen(true);
    }

    const handleUserDelete = (handle: string) => {
        setDeleteUserHandle(handle);
        setDeleteUserOpen(true);
    }

    const handleCopyUserToken = (token: string) => {
        setInfoOpen(true);
        clipboard.writeText(token);
    }

    useEffect(() => {
        fetchUserData();
        setLoading(false);
    }, [orgToken, userToken])

    return (
        <div className='userList userList-wrapper'>
            <Button onClick={handleRefresh} variant='contained' className="userList userList-button">Refresh</Button>
            <List className="userList userList-list userList-list__wrapper">
                {!loading && users ? (
                <>
                    {users.map((value) => (
                        <ListItem
                            key={value.handle}
                            disableGutters
                            className="userList userList-list userList-list__item"
                        >
                            <ListItemText primary={`Handle: ${value.handle}`} className='userList userList-list userList-list__text' />
                            <ListItemText primary={`Role: ${value.role}`} className='userList userList-list userList-list__text' />
                            <IconButton className='userList userList-list userList-list__button' onClick={() => handleCopyUserToken(value.token)}><InfoIcon /></IconButton>
                            <Popover 
                                anchorReference="anchorPosition"
                                anchorPosition={{ top: 280, left: 50 }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                open={infoOpen}
                                onClick={() => setInfoOpen(false)}
                                className='userList userList-list userList-list__popover'
                            >
                                <Typography sx={{ p: 2 }}>Copied User-Token to clipboard.</Typography>
                            </Popover>
                            <IconButton className='userList userList-list userList-list__button' onClick={() => handleUserEdit(value.handle)} disabled={currentHandle == value.handle}><EditIcon /></IconButton>
                            <IconButton className='userList userList-list userList-list__button' onClick={() => handleUserDelete(value.handle)} disabled={currentHandle == value.handle}><DeleteIcon /></IconButton>
                        </ListItem>
                    ))}
                </>
                ): <CircularProgress />}
            </List>
        </div>
    )
}