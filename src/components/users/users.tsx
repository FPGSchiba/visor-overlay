import { Alert, Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../store/format";
import { NavigationHeader } from "../functions/utils/navigation-header";
import { EditUser } from "./edit-user";
import { UserList } from "./user-list";
import { UserNavigation } from "./user-navigation";

export function Users() {
    const currentRole = useSelector((state: AppState) => state.authState.currentUser.role);
    const navigate = useNavigate();
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editUserHandle, setEditUserHandle] = useState('');

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
            <UserList setEditUserOpen={setEditUserOpen} setEditUserHandle={setEditUserHandle} />
            <Collapse in={editUserOpen} className="login login-form login-form__collapse">
                <EditUser handle={editUserHandle} setOpen={setEditUserOpen} />
            </Collapse>
        </div>
    )
}