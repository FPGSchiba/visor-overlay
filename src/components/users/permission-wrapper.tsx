import React, { memo, cloneElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppState } from "../../store/format";

type PermissionWrapperProps = {
    roles: string[];
    children: JSX.Element;
};

const notFoundPage = () => <Navigate to={{ pathname: '/not-found' }} />;

// eslint-disable-next-line react/display-name
const PermissionWrapper = memo<PermissionWrapperProps>((props: PermissionWrapperProps) => {
    const { roles, children } = props;
    const role = useSelector((state: AppState) => state.authState.currentUser.role);
    const [hasAccess, setHasAccess] = useState(false);
    useEffect(() => {
        setHasAccess(role && roles.includes(role))

    }, [role, roles])

    return (
        <>
        { hasAccess ? (
            cloneElement(children)
        ) : null}
        </>
    )
});

export { PermissionWrapper }
