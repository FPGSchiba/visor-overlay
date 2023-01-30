import { Alert, Button, Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersList } from "../../store/actions/user";
import { AppState, IUser } from "../../store/format";
import { NavigationHeader } from "../functions/utils/navigation-header";
import { CreateUser } from "./create-user";
import { DeleteUser } from "./delete-user";
import { EditUser } from "./edit-user";
import { UserList } from "./user-list";

export function Users() {
    const currentRole = useSelector((state: AppState) => state.authState.currentUser.role);
    const navigate = useNavigate();
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editUserHandle, setEditUserHandle] = useState('');
    const [deleteUserHandle, setDeleteUserHandle] = useState('');
    const [deleteUserOpen, setDeleteUserOpen] = useState(false);
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [users, setUsers] = useState([] as IUser[]);
    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);
    const dispatch = useDispatch();

    const fetchUserData = () => {
        dispatch(getUsersList(orgToken, userToken, (err, data) => {
            if (!err) {
                setUsers(data);
            } else {
                console.error(err);
            }
        }))
    }

    useEffect(() => {
        if (currentRole != 'Admin') {
            navigate('/no-access');
        }
    }, [currentRole]);

    const handleOpenCreateUser = () => {
        setCreateUserOpen(true);
    }

    return (
        <div>
            <NavigationHeader header="Users" />
            <div className="usersCreate usersCreate-wrapper">
                <Button onClick={handleOpenCreateUser} className="usersCreate usersCreate-button" variant="contained">Create</Button>
            </div>
            <UserList setEditUserOpen={setEditUserOpen} setEditUserHandle={setEditUserHandle} users={users} fetchUserData={fetchUserData} setDeleteUserHandle={setDeleteUserHandle} setDeleteUserOpen={setDeleteUserOpen} />
            <Collapse in={editUserOpen} className="login login-form login-form__collapse">
                <EditUser handle={editUserHandle} setOpen={setEditUserOpen} fetchUserData={fetchUserData} />
            </Collapse>
            <Collapse in={createUserOpen} className="login login-form login-form__collapse">
                <CreateUser setOpen={setCreateUserOpen} fetchUserData={fetchUserData} />
            </Collapse>
            <Collapse in={deleteUserOpen} className="login login-form login-form__collapse">
                <DeleteUser setOpen={setDeleteUserOpen} fetchUserData={fetchUserData} handle={deleteUserHandle} />
            </Collapse>
        </div>
    )
}