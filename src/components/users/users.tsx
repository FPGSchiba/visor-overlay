import { Alert, Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersList } from "../../store/actions/user";
import { AppState, IUser } from "../../store/format";
import { NavigationHeader } from "../functions/utils/navigation-header";
import { EditUser } from "./edit-user";
import { UserList } from "./user-list";
import { UserNavigation } from "./user-navigation";

export function Users() {
    const currentRole = useSelector((state: AppState) => state.authState.currentUser.role);
    const navigate = useNavigate();
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editUserHandle, setEditUserHandle] = useState('');
    const [users, setUsers] = useState([] as IUser[]);
    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);
    const dispatch = useDispatch();

    const fetchUserData = () => {
        dispatch(getUsersList(orgToken, userToken, (err, data) => {
            if (!err) {
                setUsers(data);
            } else {
                console.log(err);
            }
        }))
    }

    useEffect(() => {
        if (currentRole != 'Admin') {
            navigate('/no-access');
        }
    }, [currentRole]);

    const handleEditUserClose = () => {
        setEditUserOpen(false);
    }

    return (
        <div>
            <NavigationHeader header="Users" />
            <UserNavigation />
            <UserList setEditUserOpen={setEditUserOpen} setEditUserHandle={setEditUserHandle} users={users} fetchUserData={fetchUserData} />
            <Collapse in={editUserOpen} className="login login-form login-form__collapse">
                <EditUser handle={editUserHandle} setOpen={setEditUserOpen} fetchUserData={fetchUserData} />
            </Collapse>
        </div>
    )
}