import { IconButton, Popover, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/format";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/util";
import { clearUser } from "../../store/actions/user";
import { clipboard } from "electron";

export function UserInfo(props: {setUserInfoOpen: (open: boolean) => void }) {
    const { setUserInfoOpen } = props;
    const user = useSelector((state: AppState) => state.authState.currentUser);
    const org = useSelector((state: AppState) => state.authState.currentOrg);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.handle && !org.name && !user.role) {
            setUserInfoOpen(false);
        }
    }, [user, org])

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleCopyOrgToken = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        clipboard.writeText(org.token);
    }

    const handleClick = () => {
        setUserInfoOpen(false);
    }

    const handleLogout = () => {
        logoutUser();
        dispatch(
            clearUser()
        )
        navigate('/login');
        setUserInfoOpen(false);
    }

    return (
        <>
            <div className="userInfo userInfo-wrapper">
                <div className="userInfo userInfo-user">
                    <Typography variant="h6" component={'h6'}>{user.handle}</Typography>
                    <Typography variant="h6" component={'h6'}>{user.role}</Typography>
                </div>
                <div className="userInfo userInfo-org">
                    <Typography variant="h6" component={'h6'}>{org.name}</Typography>
                </div>
                <IconButton onClick={handleClick} className='userInfo userInfo-button'><CloseIcon /></IconButton>
                <IconButton onClick={handleLogout} className='userInfo userInfo-button'><LogoutIcon /></IconButton>
                <IconButton aria-describedby={id} onClick={handleCopyOrgToken} className='userInfo userInfo-button'><InfoIcon /></IconButton>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Copied Org-Token to clipboard.</Typography>
            </Popover>
        </>
    )
}