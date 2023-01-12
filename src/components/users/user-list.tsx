import { Button, CircularProgress, IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../store/actions/user";
import { AppState, IUser } from "../../store/format";
import EditIcon from '@mui/icons-material/Edit';

export function UserList(props: {setEditUserOpen: (open: boolean) => void, setEditUserHandle: (handle: string) => void}) {
    const { setEditUserOpen, setEditUserHandle } = props;
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([] as IUser[]);
    const dispatch = useDispatch();
    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);
    const currentHandle = useSelector((state: AppState) => state.authState.currentUser.handle);

    const fetchUserData = () => {
        dispatch(getUsersList(orgToken, userToken, (err, data) => {
            if (!err) {
                setUsers(data);
                setLoading(false);
            } else {
                console.log(err);
            }
        }))
    }

    const handleRefresh = () => {
        setLoading(true);
        fetchUserData();
    }

    const handleUserEdit = (handle: string) => {
        setEditUserHandle(handle);
        setEditUserOpen(true);
    }

    useEffect(() => {
        fetchUserData();
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
                            <IconButton className='userList userList-list userList-list__button' onClick={() => handleUserEdit(value.handle)} disabled={currentHandle == value.handle}><EditIcon /></IconButton>
                        </ListItem>
                    ))}
                </>
                ): <CircularProgress />}
            </List>
        </div>
    )
}